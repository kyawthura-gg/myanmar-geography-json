<div align="center">
  <img src="https://github.com/user-attachments/assets/e06e79b1-0a92-44a6-a2d3-63d7bcc53159" alt="">
</div>

<h1 align="center">Myanmar Geography JSON 🌏</h1>

<p align="center">
  This repository contains JSON files with detailed information about the regions, districts, and townships of Myanmar. The data includes postal codes, geographical coordinates (latitude and longitude) and names in both English and Burmese 🇲🇲.
</p>

### Features

- 🏷️ **Postal Codes**: Includes postal codes.
- 📍 **Geographical Coordinates**: Provides latitude and longitude.
- 🧩 **Flexible Format**: Easy-to-use JSON format.
- 🌐 **Multi-language Support**: Names in both English and Burmese.

## 📚 Documentation

- [Download Files](#🚀-download-files) - Learn how to use and integrate the data.
- [Example JSON Format](#🌍-example-json-formats) - See how the data is structured.

### 🚀 Download Files

Easily download all the JSON files with this command:

```bash
npx gitget https://github.com/kyawthura-gg/myanmar-geography-json/tree/main/data
```

#### Download each file individually:
- [regions.json](https://raw.githubusercontent.com/kyawthura-gg/myanmar-geography-json/main/data/regions.json)
- [districts.json](https://raw.githubusercontent.com/kyawthura-gg/myanmar-geography-json/main/data/districts.json)
- [townships.json](https://raw.githubusercontent.com/kyawthura-gg/myanmar-geography-json/main/data/townships.json)
- [geography.json](https://raw.githubusercontent.com/kyawthura-gg/myanmar-geography-json/main/data/geography.json)

### 🌍 Example JSON Formats

Here are some example data structures for regions, districts, townships, and combined geography data.

#### `regions.json`

```json
{
  "id": 9,
  "regionCode": "MMR010",
  "regionNameEn": "Mandalay",
  "regionNameMm": "မန္တလေးတိုင်းဒေသကြီး"
}
```

#### `districts.json`

```json
{
  "id": 39,
  "regionCode": "MMR010",
  "districtCode": "MMR010D002",
  "districtNameEn": "Pyinoolwin",
  "districtNameMm": "ပြင်ဦးလွင်ခရိုင်"
}
```

#### `townships.json`

```json
{
  "id": 223,
  "regionCode": "MMR010",
  "districtCode": "MMR010D002",
  "townshipCode": "MMR010011701",
  "townshipNameEn": "Mogoke",
  "townshipNameMm": "မိုးကုတ်",
  "latitude": 22.92139,
  "longitude": 96.5054,
  "postalCode": "05090"
}
```

#### `geography.json`

```json
{
 "id": 223,
  "regionCode": "MMR010",
  "regionNameEn": "Mandalay",
  "regionNameMm": "မန္တလေးတိုင်းဒေသကြီး",
  "districtCode": "MMR010D002",
  "districtNameEn": "Pyinoolwin",
  "districtNameMm": "ပြင်ဦးလွင်ခရိုင်",
  "townshipCode": "MMR010011701",
  "townshipNameEn": "Mogoke",
  "townshipNameMm": "မိုးကုတ်",
  "latitude": 22.92139,
  "longitude": 96.5054,
  "postalCode": "05090"
}
```

## Credits

- Thanks to [themimu.info](https://www.themimu.info/) for the data.

## License

This software is free to use for apps or libraries of any size. However, I ask that you don't re-sell it or represent it as yours. If you fork it and make it public, please give credit back to the original GitHub repository.

Consider this the MIT license – just be considerate.