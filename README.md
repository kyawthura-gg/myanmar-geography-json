<div align="center">
  <img src="https://github.com/user-attachments/assets/e06e79b1-0a92-44a6-a2d3-63d7bcc53159" alt="">
</div>

<h1 align="center">Myanmar Geography JSON 🌏</h1>

<p align="center">
  This repository contains JSON files with detailed information about the regions, districts, and townships of Myanmar. The data includes geographical coordinates (latitude and longitude) and names in both English and Burmese. 🇲🇲
</p>

### Features

- 🗺️ **Regions Data**: Details about Myanmar’s regions.
- 📍 **Districts Data**: Information about districts within each region.
- 🏘️ **Townships Data**: Data for townships within each district.
- 🌐 **Multi-language Support**: Names available in English and Burmese.
- 🚀 **Easy to Use**: JSON format that’s simple to integrate into your projects.

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
  "id": 1,
  "regionCode": "MMR001",
  "regionNameEn": "Kachin",
  "regionNameMm": "ကချင်ပြည်နယ်"
}
```

#### `districts.json`

```json
{
  "id": 1,
  "regionCode": "MMR001",
  "districtCode": "MMR001D001",
  "districtNameEn": "Myitkyina",
  "districtNameMm": "မြစ်ကြီးနားခရိုင်"
}
```

`townships.json`

```json
{
  "id": 1,
  "regionCode": "MMR017",
  "districtCode": "MMR017D006",
  "townshipCode": "MMR017024",
  "townshipNameEn": "Bogale",
  "townshipNameMm": "ဘိုကလေး",
  "longitude": "95.3968",
  "latitude": "16.295"
}
```

`geography.json`

```json
{
  "id": 1,
  "regionCode": "MMR017",
  "regionNameEn": "Ayeyarwady",
  "regionNameMm": "ဧရာဝတီတိုင်းဒေသကြီး",
  "districtCode": "MMR017D006",
  "districtNameEn": "Pyapon",
  "districtNameMm": "ဖျာပုံခရိုင်",
  "townshipCode": "MMR017024",
  "townshipNameEn": "Bogale",
  "townshipNameMm": "ဘိုကလေး",
  "longitude": "95.3968",
  "latitude": "16.295"
}
```
