import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'

import { convert } from '../src/commands/convert'
import { build } from '../src/commands/build'

let tmp: string

describe('Test for the `convert.ts`.', () => {
  const jsonPath = path.join(__dirname, 'data/convert.json')

  beforeEach(async () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
  })

  afterEach(async () => {
    fs.rmSync(tmp, { recursive: true })
  })

  it('Should convert `data/convert.json` to YAML and the YAML should be valid.', async () => {
    const yamlPath = path.join(tmp, 'convert.yml')

    convert(jsonPath, yamlPath)
    const yml = fs.readFileSync(yamlPath, 'utf-8')

    assert.equal(
      `version: 8
name: example
metadata: {}
sources:
  geolonia:
    type: vector
    url: https://api.geolonia.com/v1/sources?key=YOUR-API-KEY
sprite: https://sprites.geolonia.com/basic-white
glyphs: https://glyphs.geolonia.com/{fontstack}/{range}.pbf
layers:
  - !!inc/file layers/background.yml
  - !!inc/file >-
    layers/background-with-very-long-name-background-with-very-long-name-background-with-very-long-name.yml
id: example
`,
      yml,
    )

    const outJsonPath = path.join(tmp, 'converted-back.json')
    // This will throw an error if the outputted YAML was invalid
    await build(yamlPath, outJsonPath, { provider: 'default' })
    assert.isTrue(fs.existsSync(outJsonPath))
  })

  it('Should create layers directory.', () => {
    const yamlPath = path.join(tmp, 'convert.yml')
    const layerPath = path.join(tmp, 'layers/background.yml')

    convert(jsonPath, yamlPath)

    const result = fs.existsSync(layerPath)

    assert.equal(true, result)
  })
})
