import {
	getOptimizedImageUrl,
	OptimizedImageProps
} from '@/app/utlis/image-optimization'
import Image from 'next/image'

interface StrapiImageProps extends Omit<OptimizedImageProps, 'src'> {
	image: {
		url: string
		alternativeText?: string
		width?: number
		height?: number
	}
	sizes?: string
	fill?: boolean
	quality?: number
	priority?: boolean
	className?: string
}

export const OptimizedImage: React.FC<StrapiImageProps> = ({
	image,
	width,
	height,
	quality = 80,
	priority = false,
	sizes = '100vw',
	fill = false,
	className
}) => {
	if (!image?.url) {
		return null
	}

	const optimizedSrc = getOptimizedImageUrl(image.url, width, height, quality)

	const imageProps = {
		src: optimizedSrc,
		alt: image.alternativeText || 'Image',
		priority,
		sizes,
		className
	}

	if (fill) {
		return <Image {...imageProps} fill style={{ objectFit: 'cover' }} />
	}

	return (
		<Image
			{...imageProps}
			width={width || image.width || 800}
			height={height || image.height || 600}
		/>
	)
}

export default OptimizedImage
