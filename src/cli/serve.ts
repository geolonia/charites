import { Command } from 'commander'
import { serve, serveOptions } from '../commands/serve'
import { error } from '../lib/error'
import { defaultSettings } from '../lib/defaultValues'
import fs from 'fs'

const program = new Command()
program
  .name('serve')
  .arguments('<source>')
  .description('serve your map locally')
  .option(
    '--provider [provider]',
    'your map service. e.g. `mapbox`, `geolonia`',
  )
  .option(
    '--mapbox-access-token [mapboxAccessToken]',
    'Access Token for the Mapbox',
  )
  .action((source: string, serveOptions: serveOptions) => {
    const options: serveOptions = program.opts()
    options.provider = serveOptions.provider
    options.mapboxAccessToken = serveOptions.mapboxAccessToken
    if (!fs.existsSync(defaultSettings.configFile)) {
      fs.writeFileSync(
        defaultSettings.configFile,
        `provider: ${options.provider || 'default'}`,
      )
    }
    try {
      serve(source, program.opts())
    } catch (e) {
      error(e)
    }
  })

export default program
