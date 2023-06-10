import { _GlobeView as GlobeView } from '@deck.gl/core';
import { SolidPolygonLayer, GeoJsonLayer } from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import { DeckGL } from 'deck.gl';

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  zoom: 1,
  minZoom: 1,
  maxZoom: 15,
};

export default function App() {

  return (
    <div >
      <DeckGL
        views={new GlobeView()}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        style={{backgroundColor:"#cc2c2"}}
        layers={[
          new SolidPolygonLayer({
            id: 'base-map-water',
            data: [
              [[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]
            ],
            opacity: 0.7,
            getPolygon: (d) => d,
            stroked: false,
            filled: true,
            getFillColor: [170, 211, 223]
          }),
          new GeoJsonLayer({
            id: 'base-map-land',
            data: COUNTRIES,
            stroked: true,
            filled: true,
            pickable: true,
            autoHighlight: true,
            lineWidthMinPixels: 2,
            getLineColor: [160, 165, 189],
            getFillColor: [242, 239, 233],
          }),
          new HexagonLayer({
            id: 'hexagon-layer',
            data:"1,1",
            pickable: true,
            extruded: true,
            radius: 200,
            elevationScale: 4,
            getPosition: d => d.COORDINATES
          })

        ]}
      />
    </div>
  );
}
