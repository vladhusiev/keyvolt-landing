'use client'

import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef, useState } from 'react'

interface MapCenter {
	lat: number
	lng: number
}

interface GoogleMapProps {
	center: MapCenter
	zoom?: number
	className?: string
}

interface MapInstance {
	map: google.maps.Map
	marker: google.maps.marker.AdvancedMarkerElement
}

const DEFAULT_ZOOM = 13

const GoogleMap: React.FC<GoogleMapProps> = ({
	center,
	zoom = DEFAULT_ZOOM,
	className
}) => {
	const mapRef = useRef<HTMLDivElement>(null)
	const mapInstanceRef = useRef<MapInstance | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const initMap = async (): Promise<void> => {
			try {
				setIsLoading(true)

				if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
					throw new Error('Google Maps API key is not configured')
				}

				if (!mapRef.current) {
					throw new Error('Map container not found')
				}

				const loader = new Loader({
					apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
					version: 'weekly',
					libraries: ['maps', 'marker']
				})

				const { Map } = (await loader.importLibrary(
					'maps'
				)) as google.maps.MapsLibrary
				const { AdvancedMarkerElement } = (await loader.importLibrary(
					'marker'
				)) as google.maps.MarkerLibrary

				const mapOptions: google.maps.MapOptions = {
					center: center,
					zoom: zoom,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapId: '2c80e66335dad6af',
					disableDefaultUI: true
				}

				const map = new Map(mapRef.current, mapOptions)

				const markerOptions = {
					map: map,
					position: center,
					title: 'KeyVolt Energy'
				}

				const marker = new AdvancedMarkerElement(markerOptions)

				mapInstanceRef.current = { map, marker }
				setIsLoading(false)
			} catch {
				setIsLoading(false)
			}
		}

		initMap()

		return () => {
			if (mapInstanceRef.current?.marker) {
				mapInstanceRef.current.marker.map = null
			}
			mapInstanceRef.current = null
		}
	}, [center, zoom])

	useEffect(() => {
		if (mapInstanceRef.current && !isLoading) {
			mapInstanceRef.current.map.setCenter(center)
			mapInstanceRef.current.marker.position = center
		}
	}, [center, isLoading])

	return (
		<div className={className}>
			<div ref={mapRef} style={{ width: '100%', height: '100%' }} />
			{isLoading && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1
					}}
				>
					<p>Loading map...</p>
				</div>
			)}
		</div>
	)
}

export default GoogleMap
