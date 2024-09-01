import regions from '../data/regions.json'
import districts from '../data/districts.json'
import townships from '../data/townships.json'
import geography from '../data/geography.json'
import { expect, test } from 'bun:test'

test('region code is unique', () => {
  const regionCodes = regions.map((region) => region.regionCode)
  const uniqueRegionCodes = new Set(regionCodes)
  expect(uniqueRegionCodes.size).toBe(regionCodes.length)
})

test('district code is unique', () => {
  const districtCodes = districts.map((district) => district.districtCode)
  const uniqueDistrictCodes = new Set(districtCodes)
  expect(uniqueDistrictCodes.size).toBe(districtCodes.length)
})

test('township code is unique', () => {
  const townshipCodes = townships.map((township) => township.townshipCode)
  const uniqueTownshipCodes = new Set(townshipCodes)
  expect(uniqueTownshipCodes.size).toBe(townshipCodes.length)
})

test('geography is unique', () => {
  const townshipCodes = geography.map((township) => township.townshipCode)
  const uniqueTownshipCodes = new Set(townshipCodes)
  expect(uniqueTownshipCodes.size).toBe(townshipCodes.length)
})

test('each district belongs to a valid region', () => {
  const regionCodes = new Set(regions.map((region) => region.regionCode))
  districts.forEach((district) => {
    expect(regionCodes.has(district.regionCode)).toBe(true)
  })
})

test('each township belongs to a valid district', () => {
  const districtCodes = new Set(
    districts.map((district) => district.districtCode),
  )
  townships.forEach((township) => {
    expect(districtCodes.has(township.districtCode)).toBe(true)
  })
})

test('each geography entry corresponds to a valid township', () => {
  const townshipCodes = new Set(
    townships.map((township) => township.townshipCode),
  )
  geography.forEach((geo) => {
    expect(townshipCodes.has(geo.townshipCode)).toBe(true)
  })
})

test('all codes follow expected format', () => {
  const formats = {
    region: { regex: /^MMR\d{3}$/, data: regions, key: 'regionCode' },
    district: {
      regex: /^MMR\d{3}D\d{3}$/,
      data: districts,
      key: 'districtCode',
    },
    township: { regex: /^MMR\d{9}$/, data: townships, key: 'townshipCode' },
  }

  Object.entries(formats).forEach(([type, { regex, data, key }]) => {
    const invalidCodes = data.filter((item: any) => !regex.test(item[key]))
    if (invalidCodes.length > 0) {
      console.log(
        `Invalid ${type} codes:`,
        invalidCodes.map((item: any) => item[key]),
      )
    }
    expect(invalidCodes.length).toBe(0)
  })
})

test('all regions in districts data exist in regions data', () => {
  const regionCodes = new Set(regions.map((region) => region.regionCode))
  const districtRegionCodes = new Set(
    districts.map((district) => district.regionCode),
  )

  districtRegionCodes.forEach((code) => {
    expect(regionCodes.has(code)).toBe(true)
  })
})

test('all regions have at least one district', () => {
  const regionCodes = new Set(regions.map((region) => region.regionCode))
  const regionsWithDistricts = new Set(
    districts.map((district) => district.regionCode),
  )

  expect(regionCodes.size).toBe(regionsWithDistricts.size)
})

test('identify districts without townships', () => {
  const districtCodes = new Set(
    districts.map(({ districtCode }) => districtCode),
  )
  const districtsWithTownships = new Set(
    townships.map(({ districtCode }) => districtCode),
  )

  const districtsWithoutTownships = [...districtCodes].filter(
    (code) => !districtsWithTownships.has(code),
  )

  expect(districtsWithoutTownships.length).toBe(0)
})

test('all townships have a corresponding district', () => {
  const districtCodes = new Set(
    districts.map((district) => district.districtCode),
  )
  const townshipDistrictCodes = new Set(
    townships.map((township) => township.districtCode),
  )

  const invalidTownshipDistricts = [...townshipDistrictCodes].filter(
    (code) => !districtCodes.has(code),
  )
  if (invalidTownshipDistricts.length > 0) {
    console.log(
      `Township district codes not in districts data: ${invalidTownshipDistricts.join(
        ', ',
      )}`,
    )
  }

  expect(invalidTownshipDistricts.length).toBe(0)
})

test('find townships with same name (English or Myanmar) within a region', () => {
  const townshipsByRegion: any = {}
  for (const township of townships) {
    const { regionCode, townshipNameEn, townshipNameMm } = township

    if (!townshipsByRegion[regionCode]) {
      townshipsByRegion[regionCode] = { en: {}, mm: {} }
    }

    if (townshipNameEn) {
      if (!townshipsByRegion[regionCode].en[townshipNameEn]) {
        townshipsByRegion[regionCode].en[townshipNameEn] = []
      }
      townshipsByRegion[regionCode].en[townshipNameEn].push(township)
    }

    if (townshipNameMm) {
      if (!townshipsByRegion[regionCode].mm[townshipNameMm]) {
        townshipsByRegion[regionCode].mm[townshipNameMm] = []
      }
      townshipsByRegion[regionCode].mm[townshipNameMm].push(township)
    }
  }

  const regionsWithDuplicates: any[] = []

  // Find duplicates
  for (const regionCode in townshipsByRegion) {
    const region = townshipsByRegion[regionCode]
    const enDuplicates = []
    const mmDuplicates = []

    for (const enName in region.en) {
      if (region.en[enName].length > 1) {
        enDuplicates.push({
          name: enName,
          count: region.en[enName].length,
          townships: region.en[enName],
        })
      }
    }

    for (const mmName in region.mm) {
      if (region.mm[mmName].length > 1) {
        mmDuplicates.push({
          name: mmName,
          count: region.mm[mmName].length,
          townships: region.mm[mmName],
        })
      }
    }

    if (enDuplicates.length > 0 || mmDuplicates.length > 0) {
      regionsWithDuplicates.push({
        regionCode,
        enDuplicates,
        mmDuplicates,
      })
    }
  }

  // Log duplicates
  if (regionsWithDuplicates.length > 0) {
    console.log('Regions with townships having the same name:')
    for (const region of regionsWithDuplicates) {
      console.log(`Region ${region.regionCode}:`)
      if (region.enDuplicates.length > 0) {
        console.log('  English name duplicates:')
        for (const dup of region.enDuplicates) {
          console.log(`    "${dup.name}" appears ${dup.count} times:`)
          for (const t of dup.townships) {
            console.log(`      - Township code: ${t.townshipCode}`)
          }
        }
      }
      if (region.mmDuplicates.length > 0) {
        console.log('  Myanmar name duplicates:')
        for (const dup of region.mmDuplicates) {
          console.log(`    "${dup.name}" appears ${dup.count} times:`)
          for (const t of dup.townships) {
            console.log(`      - Township code: ${t.townshipCode}`)
          }
        }
      }
    }
  }

  expect(regionsWithDuplicates.length).toBe(0)
})
