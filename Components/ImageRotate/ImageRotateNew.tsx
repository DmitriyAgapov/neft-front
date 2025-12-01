'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { urls } from "@/utils/constants";
import styles from "@/Components/ImageRotate/ImageRotate.module.css";
import { PauseIcon, PlayIcon } from "@/Components/Icons/Icons";

interface RotatableObjectProps {
	_images?: string[];
	width?: number;
	height?: number;
	slug: string,
	className?: string;
	alt?: string;
	sensitivity?: number;
	autoPlay?: boolean; // Автозапуск вращения
	rotationSpeed?: number; // Скорость вращения (градусов в секунду)
	showControls?: boolean; // Показывать кнопки управления
}
const basePath = process.env.NODE_ENV !== "development" ? process.env.NEXT_PUBLIC_IMG_PROD  : "http://localhost:3000/";
export default function ImageRotateNew({
	_images,
	width = 400,
	height = 400,
	slug,
	className = '',
	alt = '3D object',
	sensitivity = 1,
	autoPlay = false,
	rotationSpeed = 30, // 60 градусов в секунду
	showControls = true
}: RotatableObjectProps) {
	const [rotation, setRotation] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(autoPlay);
	const [direction, setDirection] = useState<1 | -1>(1); // 1 - вперед, -1 - назад
	const containerRef = useRef<HTMLDivElement>(null);
	const startXRef = useRef(0);
	const startRotationRef = useRef(0);
	const lastTimeRef = useRef<number>(0);
	const animationRef = useRef<number>(null);
	const images = useMemo(() => {
		const images:string[] = _images || [];
		for (let i = 1; i < 181; i++) {
			images.push(`${urls[slug]}` + `file_${i}.webp`)
		}
		return images;
	}, [ slug, _images ])

	const imageIndex = Math.floor((rotation / 360) * images.length) % images.length;
	const currentImage = images[imageIndex];

	// Автоматическое вращение
	const animateRotation = useCallback((timestamp: number) => {
		if (!lastTimeRef.current) lastTimeRef.current = timestamp;
		const deltaTime = (timestamp - lastTimeRef.current) / 1000; // В секундах
		lastTimeRef.current = timestamp;

		if (isPlaying) {
			setRotation(prev => {
				let newRotation = prev + (rotationSpeed * deltaTime * direction);

				// Обеспечиваем непрерывное вращение
				if (newRotation >= 360) newRotation -= 360;
				if (newRotation < 0) newRotation += 360;

				return newRotation;
			});
		}

		animationRef.current = requestAnimationFrame(animateRotation);
	}, [isPlaying, rotationSpeed, direction]);

	// Запуск/остановка анимации
	const togglePlay = useCallback(() => {
		setIsPlaying(prev => !prev);
	}, []);

	const stopRotation = useCallback(() => {
		setIsPlaying(false);
	}, []);

	const startRotation = useCallback(() => {
		setIsPlaying(true);
	}, []);

	const reverseRotation = useCallback(() => {
		setDirection(prev => prev === 1 ? -1 : 1);
	}, []);

	const resetRotation = useCallback(() => {
		setRotation(0);
		setIsPlaying(false);
	}, []);

	// Обработчики мыши
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		setIsDragging(true);
		setIsPlaying(false); // Останавливаем автоповорот при ручном управлении
		startXRef.current = e.clientX;
		startRotationRef.current = rotation;
		e.preventDefault();
	}, [rotation]);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isDragging) return;

		const deltaX = e.clientX - startXRef.current;
		const rotationSensitivity = (360 / (width * 0.8)) * sensitivity;

		let newRotation = startRotationRef.current + deltaX * rotationSensitivity;
		newRotation = newRotation % 360;
		if (newRotation < 0) newRotation += 360;

		setRotation(newRotation);
	}, [isDragging, width, sensitivity]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Инициализация и очистка анимации
	useEffect(() => {
		lastTimeRef.current = 0;
		animationRef.current = requestAnimationFrame(animateRotation);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [animateRotation]);

	// Обработчики событий мыши
	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp]);

	// Стиль курсора
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
		}
	}, [isDragging]);

	// Предзагрузка изображений
	useEffect(() => {
		const preloadImages = () => {
			const nextIndex = (imageIndex + 1) % images.length;
			const prevIndex = (imageIndex - 1 + images.length) % images.length;

			[images[nextIndex], images[prevIndex]].forEach(src => {
				const img = new window.Image();
				img.src = src;
			});
		};

		if (isLoaded) {
			preloadImages();
		}
	}, [imageIndex, images, isLoaded]);

	return (
		<div className={styles.root}>
			<div
				ref={containerRef}
				className="relative select-none"
				style={{ width, height }}
				onMouseDown={handleMouseDown}
			>
				{currentImage && (
					<Image
						src={currentImage}
						alt={alt}
						width={width}
						height={height}
						className="object-contain transition-opacity duration-200"
						style={{ opacity: isLoaded ? 1 : 0 }}
						draggable={false}
						priority={imageIndex === 0}
						onLoad={() => setIsLoaded(true)}
					/>
				)}

				{/* Индикатор загрузки */}
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
					</div>
				)}
				<div className={styles.control}>
					<a onClick={() => togglePlay()}>{!isPlaying ? <PlayIcon/> : <PauseIcon/>}</a>
				</div>
			</div>
		</div>
	);
}
