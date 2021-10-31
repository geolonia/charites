/**
 * Definition of TileJSON v3.0.0
 * see https://github.com/mapbox/tilejson-spec/blob/master/3.0.0/schema.json
 */
export type TileJSON = {
    tilejson: string,
    tiles: string[],
    vector_layers: {
      id: string,
      fields: { [key: string]: string; },
      description: string,
      maxzoom: string,
      minzoom: string,
    } [],
    attribution?: string,
    bounds?: number[],
    center?: number[],
    data?: string[],
    description?: string,
    fillzoom?: number,
    grids?: string[],
    legend?: string,
    maxzoom?: number,
    minzoom?: number,
    name?: string,
    scheme?: string,
    template?: string,
    version?: string,
}