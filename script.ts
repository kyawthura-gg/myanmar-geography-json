import parse from 'csv-simple-parser'

async function main() {
  //regions
  try {
    const regionText = await Bun.file('./csv/regions.csv').text()
    const regionParser: any[] = parse(regionText, { header: true })

    const regionNewFormat = regionParser.map((v, i) => ({
      id: i + 1, // don't start from 0
      regionCode: v['SR_Pcode'],
      regionNameEn: v['SR_Name_Eng'],
      regionNameMm: v['SR_Name_MMR'],
    }))
    const json = JSON.stringify(regionNewFormat, null, 2)

    await Bun.write('./data/regions.json', json)
    console.log('regions.json file has been created successfully')
  } catch (error) {
    console.error('generating regions.json failed')
    console.error(error)
  }

  // districts
  try {
    const districtText = await Bun.file('./csv/districts.csv').text()
    const districtParser: any[] = parse(districtText, { header: true })

    const districtNewFormat = districtParser.map((parsedData, i) => {
      let regionCode = parsedData['SR']
      // ignore Bago - east/west
      if (regionCode === 'MMR007' || regionCode === 'MMR008') {
        regionCode = 'MMR007'
      }
      // ignore Shan - south/north/east
      if (
        regionCode === 'MMR014' ||
        regionCode === 'MMR015' ||
        regionCode === 'MMR016'
      ) {
        regionCode = 'MMR014'
      }

      return {
        id: i + 1,
        regionCode,
        districtCode: parsedData['District_Pcode'],
        districtNameEn: parsedData['District_Name_Eng']?.trim(),
        districtNameMm: parsedData['District_Name_MMR']?.trim(),
      }
    })
    const json = JSON.stringify(districtNewFormat, null, 2)
    await Bun.write('./data/districts.json', json)
    console.log('districts.json file has been created successfully')
  } catch (error) {
    console.error('generating districts.json failed')
    console.error(error)
  }

  //townships
  try {
    const townshipText = await Bun.file('./csv/townships.csv').text()
    const townshipParser: any[] = parse(townshipText, { header: true })

    const townshipNewFormat = townshipParser.map((parsedData, i) => {
      // Rename keys
      let regionCode = parsedData['SR_Pcode']
      // ignore Bago - east/west
      if (regionCode === 'MMR007' || regionCode === 'MMR008') {
        regionCode = 'MMR007'
      }
      // ignore Shan - south/north/east
      if (
        regionCode === 'MMR014' ||
        regionCode === 'MMR015' ||
        regionCode === 'MMR016'
      ) {
        regionCode = 'MMR014'
      }

      return {
        id: i + 1,
        regionCode,
        districtCode: parsedData['District/SAZ_Pcode'],
        townshipCode: parsedData['Town_Pcode'],
        townshipNameEn: parsedData['Town_Name_Eng']
          ?.replace('Town', '')
          ?.trim(),
        townshipNameMm: parsedData['Town_Name_MMR']?.trim(),
        longitude: parsedData['Longitude'],
        latitude: parsedData['Latitude'],
      }
    })
    const json = JSON.stringify(townshipNewFormat, null, 2)
    await Bun.write('./data/townships.json', json)
    console.log('townships.json file has been created successfully')
  } catch (error) {
    console.error('generating townships.json failed')
    console.error(error)
  }

  const regionList: any[] = await Bun.file('./data/regions.json', {
    type: 'application/json',
  }).json()

  const districtList: any[] = await Bun.file('./data/districts.json', {
    type: 'application/json',
  }).json()

  //geography
  try {
    const geographyText = await Bun.file('./csv/townships.csv').text()
    const geographyParser: any[] = parse(geographyText, { header: true })

    const geographyNewFormat = geographyParser.map((parsedData, i) => {
      // Rename keys
      let regionCode = parsedData['SR_Pcode']
      // ignore Bago - east/west
      if (regionCode === 'MMR007' || regionCode === 'MMR008') {
        regionCode = 'MMR007'
      }
      // ignore Shan - south/north/east
      if (
        regionCode === 'MMR014' ||
        regionCode === 'MMR015' ||
        regionCode === 'MMR016'
      ) {
        regionCode = 'MMR014'
      }

      const districtCode = parsedData['District/SAZ_Pcode']

      const region = regionList?.find((v) => v.regionCode === regionCode)
      if (!region) {
        console.warn(`region not found ${regionCode}`)
      }

      const district = districtList?.find(
        (v) => v.districtCode === districtCode,
      )
      if (!district) {
        console.warn(`district not found ${districtCode}`)
      }
      return {
        id: i + 1,
        regionCode,
        regionNameEn: region.regionNameEn,
        regionNameMm: region.regionNameMm,
        districtCode,
        districtNameEn: district?.districtNameEn,
        districtNameMm: district.districtNameMm ?? district?.districtNameEn,
        townshipCode: parsedData['Town_Pcode'],
        townshipNameEn: parsedData['Town_Name_Eng']
          ?.replace('Town', '')
          ?.trim(),
        townshipNameMm: parsedData['Town_Name_MMR']?.trim(),
        longitude: parsedData['Longitude'],
        latitude: parsedData['Latitude'],
      }
    })
    const json = JSON.stringify(geographyNewFormat, null, 2)
    await Bun.write('./data/geography.json', json)
    console.log('geography.json file has been created successfully')
  } catch (error) {
    console.error('generating geography.json failed')
    console.error(error)
  }
}

main()
