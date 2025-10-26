import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { OpportunityLocation } from '@/types/opportunity'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix para os ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface LocationMapProps {
  location: OpportunityLocation
  title: string
}

export function LocationMap({ location, title }: LocationMapProps) {
  const { coordinates, address, city, state, venue } = location

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-md">
      <div className="bg-white p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">📍</span>
          Localização
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Onde encontrar mais informações sobre esta oportunidade
        </p>
      </div>

      <div className="relative h-[400px] w-full z-10">
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={17}
          scrollWheelZoom={false}
          className="h-full w-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                {venue && (
                  <p className="text-sm font-medium text-gray-700 mb-1">{venue}</p>
                )}
                <p className="text-sm text-gray-600">{address}</p>
                <p className="text-sm text-gray-600">{city} - {state}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="bg-gray-50 p-4">
        <div className="space-y-2">
          {venue && (
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-sm font-medium min-w-[60px]">Local:</span>
              <span className="text-gray-900 text-sm font-semibold">{venue}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <span className="text-gray-500 text-sm font-medium min-w-[60px]">Endereço:</span>
            <span className="text-gray-700 text-sm">{address}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-500 text-sm font-medium min-w-[60px]">Cidade:</span>
            <span className="text-gray-700 text-sm">{city} - {state}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
