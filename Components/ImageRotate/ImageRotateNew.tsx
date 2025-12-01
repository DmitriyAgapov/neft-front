// 'use client';
//
// import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
// import Image from 'next/image';
// import { urls } from "@/utils/constants";
// import styles from "@/Components/ImageRotate/ImageRotate.module.css";
// import { PauseIcon, PlayIcon } from "@/Components/Icons/Icons";
//
// interface RotatableObjectProps {
// 	_images?: string[];
// 	width?: number;
// 	height?: number;
// 	slug: string,
// 	className?: string;
// 	alt?: string;
// 	sensitivity?: number;
// 	autoPlay?: boolean; // Автозапуск вращения
// 	rotationSpeed?: number; // Скорость вращения (градусов в секунду)
// 	showControls?: boolean; // Показывать кнопки управления
// }
// const basePath = process.env.NODE_ENV !== "development" ? process.env.NEXT_PUBLIC_IMG_PROD  : "http://localhost:3000/";
// export default function ImageRotateNew({
// 	_images,
// 	width = 400,
// 	height = 400,
// 	slug,
// 	className = '',
// 	alt = '3D object',
// 	sensitivity = 1,
// 	autoPlay = false,
// 	rotationSpeed = 30, // 60 градусов в секунду
// 	showControls = true
// }: RotatableObjectProps) {
// 	const [rotation, setRotation] = useState(0);
// 	const [isDragging, setIsDragging] = useState(false);
// 	const [isLoaded, setIsLoaded] = useState(false);
// 	const [isPlaying, setIsPlaying] = useState(autoPlay);
// 	const [direction, setDirection] = useState<1 | -1>(1); // 1 - вперед, -1 - назад
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const startXRef = useRef(0);
// 	const startRotationRef = useRef(0);
// 	const lastTimeRef = useRef<number>(0);
// 	const animationRef = useRef<number>(null);
// 	const images = useMemo(() => {
// 		const images:string[] = _images || [];
// 		for (let i = 1; i < 181; i++) {
// 			images.push(`${urls[slug]}` + `file_${i}.webp`)
// 		}
// 		return images;
// 	}, [ slug, _images ])
//
// 	const imageIndex = Math.floor((rotation / 360) * images.length) % images.length;
// 	const currentImage = images[imageIndex];
//
// 	// Автоматическое вращение
// 	const animateRotation = useCallback((timestamp: number) => {
// 		if (!lastTimeRef.current) lastTimeRef.current = timestamp;
// 		const deltaTime = (timestamp - lastTimeRef.current) / 1000; // В секундах
// 		lastTimeRef.current = timestamp;
//
// 		if (isPlaying) {
// 			setRotation(prev => {
// 				let newRotation = prev + (rotationSpeed * deltaTime * direction);
//
// 				// Обеспечиваем непрерывное вращение
// 				if (newRotation >= 360) newRotation -= 360;
// 				if (newRotation < 0) newRotation += 360;
//
// 				return newRotation;
// 			});
// 		}
//
// 		animationRef.current = requestAnimationFrame(animateRotation);
// 	}, [isPlaying, rotationSpeed, direction]);
//
// 	// Запуск/остановка анимации
// 	const togglePlay = useCallback(() => {
// 		setIsPlaying(prev => !prev);
// 	}, []);
//
// 	const stopRotation = useCallback(() => {
// 		setIsPlaying(false);
// 	}, []);
//
// 	const startRotation = useCallback(() => {
// 		setIsPlaying(true);
// 	}, []);
//
// 	const reverseRotation = useCallback(() => {
// 		setDirection(prev => prev === 1 ? -1 : 1);
// 	}, []);
//
// 	const resetRotation = useCallback(() => {
// 		setRotation(0);
// 		setIsPlaying(false);
// 	}, []);
//
// 	// Обработчики мыши
// 	const handleMouseDown = useCallback((e: React.MouseEvent) => {
// 		setIsDragging(true);
// 		setIsPlaying(false); // Останавливаем автоповорот при ручном управлении
// 		startXRef.current = e.clientX;
// 		startRotationRef.current = rotation;
// 		e.preventDefault();
// 	}, [rotation]);
//
// 	const handleMouseMove = useCallback((e: MouseEvent) => {
// 		if (!isDragging) return;
//
// 		const deltaX = e.clientX - startXRef.current;
// 		const rotationSensitivity = (360 / (width * 0.8)) * sensitivity;
//
// 		let newRotation = startRotationRef.current + deltaX * rotationSensitivity;
// 		newRotation = newRotation % 360;
// 		if (newRotation < 0) newRotation += 360;
//
// 		setRotation(newRotation);
// 	}, [isDragging, width, sensitivity]);
//
// 	const handleMouseUp = useCallback(() => {
// 		setIsDragging(false);
// 	}, []);
//
// 	// Инициализация и очистка анимации
// 	useEffect(() => {
// 		lastTimeRef.current = 0;
// 		animationRef.current = requestAnimationFrame(animateRotation);
//
// 		return () => {
// 			if (animationRef.current) {
// 				cancelAnimationFrame(animationRef.current);
// 			}
// 		};
// 	}, [animateRotation]);
//
// 	// Обработчики событий мыши
// 	useEffect(() => {
// 		if (isDragging) {
// 			document.addEventListener('mousemove', handleMouseMove);
// 			document.addEventListener('mouseup', handleMouseUp);
//
// 			return () => {
// 				document.removeEventListener('mousemove', handleMouseMove);
// 				document.removeEventListener('mouseup', handleMouseUp);
// 			};
// 		}
// 	}, [isDragging, handleMouseMove, handleMouseUp]);
//
// 	// Стиль курсора
// 	useEffect(() => {
// 		if (containerRef.current) {
// 			containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
// 		}
// 	}, [isDragging]);
//
// 	// Предзагрузка изображений
// 	useEffect(() => {
// 		const preloadImages = () => {
// 			const nextIndex = (imageIndex + 1) % images.length;
// 			const prevIndex = (imageIndex - 1 + images.length) % images.length;
//
// 			[images[nextIndex], images[prevIndex]].forEach(src => {
// 				const img = new window.Image();
// 				img.src = src;
// 			});
// 		};
//
// 		if (isLoaded) {
// 			preloadImages();
// 		}
// 	}, [imageIndex, images, isLoaded]);
//
// 	return (
// 		<div className={styles.root}>
// 			<div
// 				ref={containerRef}
// 				className="relative select-none"
// 				style={{ width, height }}
// 				onMouseDown={handleMouseDown}
// 			>
// 				{currentImage && (
// 					<Image
// 						src={currentImage}
// 						alt={alt}
// 						width={width}
// 						height={height}
// 						className="object-contain transition-opacity duration-200"
// 						style={{ opacity: isLoaded ? 1 : 0 }}
// 						draggable={false}
// 						priority={imageIndex === 0}
// 						onLoad={() => setIsLoaded(true)}
// 					/>
// 				)}
//
// 				{/* Индикатор загрузки */}
// 				{!isLoaded && (
// 					<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
// 						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// 					</div>
// 				)}
// 				<div className={styles.control}>
// 					<a onClick={() => togglePlay()}>{!isPlaying ? <PlayIcon/> : <PauseIcon/>}</a>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { urls } from "@/utils/constants";

interface RotatableObjectProps {
	_images: string[];
	width?: number;
	height?: number;
	slug: string,
	className?: string;
	alt?: string;
	sensitivity?: number;
	autoPlay?: boolean;
	rotationSpeed?: number;
	showControls?: boolean;
	preloadAll?: boolean; // Предзагружать все изображения
}

export default function ImageRotateNew({
	_images,
	width = 400,
	slug,
	height = 400,
	className = '',
	alt = '3D object',
	sensitivity = 1,
	autoPlay = false,
	rotationSpeed = 60,
	showControls = true,
	preloadAll = true // По умолчанию предзагружаем все
}: RotatableObjectProps) {
	const [rotation, setRotation] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [isPlaying, setIsPlaying] = useState(autoPlay);
	const [direction, setDirection] = useState<1 | -1>(1);
	const [preloadProgress, setPreloadProgress] = useState(0);
	const [isPreloading, setIsPreloading] = useState(true);
	const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
	const images = useMemo(() => {
		const images:string[] =  [];
		for (let i = 1; i < 181; i++) {
			images.push(`${urls[slug]}` + `file_${i}.webp`)
		}
		return images;
	}, [ slug, _images ])
	const containerRef = useRef<HTMLDivElement>(null);
	const startXRef = useRef(0);
	const startRotationRef = useRef(0);
	const lastTimeRef = useRef<number>(0);
	const animationRef = useRef<number>(null);

	const imageIndex = Math.floor((rotation / 360) * images.length) % images.length;
	const currentImage = images[imageIndex];

	// Функция предзагрузки всех изображений
	const preloadAllImages = useCallback(async () => {
		if (!preloadAll || images.length === 0) {
			setIsPreloading(false);
			return;
		}

		const total = images.length;
		let loaded = 0;
		const newLoadedImages = new Set<string>();

		// Добавляем первое изображение в загруженные сразу
		newLoadedImages.add(images[0]);
		setLoadedImages(new Set(newLoadedImages));
		loaded++;
		setPreloadProgress(Math.floor((loaded / total) * 100));

		// Функция для загрузки одного изображения
		const loadImage = (src: string): Promise<void> => {
			return new Promise((resolve, reject) => {
				const img = new window.Image();
				img.src = src;

				img.onload = () => {
					newLoadedImages.add(src);
					setLoadedImages(new Set(newLoadedImages));
					loaded++;
					setPreloadProgress(Math.floor((loaded / total) * 100));
					resolve();
				};

				img.onerror = () => {
					console.warn(`Не удалось загрузить изображение: ${src}`);
					loaded++;
					setPreloadProgress(Math.floor((loaded / total) * 100));
					resolve(); // Продолжаем даже при ошибке
				};
			});
		};

		// Загружаем изображения пачками по 10 для лучшей производительности
		const batchSize = 10;
		for (let i = 1; i < total; i += batchSize) {
			const batch = images.slice(i, i + batchSize);
			await Promise.allSettled(batch.map(src => loadImage(src)));

			// Небольшая пауза между пачками
			if (i + batchSize < total) {
				await new Promise(resolve => setTimeout(resolve, 50));
			}
		}

		setIsPreloading(false);
	}, [images, preloadAll]);

	// Автоматическое вращение
	const animateRotation = useCallback((timestamp: number) => {
		if (!lastTimeRef.current) lastTimeRef.current = timestamp;
		const deltaTime = (timestamp - lastTimeRef.current) / 1000;
		lastTimeRef.current = timestamp;

		if (isPlaying && !isPreloading) {
			setRotation(prev => {
				let newRotation = prev + (rotationSpeed * deltaTime * direction);

				if (newRotation >= 360) newRotation -= 360;
				if (newRotation < 0) newRotation += 360;

				return newRotation;
			});
		}

		animationRef.current = requestAnimationFrame(animateRotation);
	}, [isPlaying, rotationSpeed, direction, isPreloading]);

	// Управление вращением
	const togglePlay = useCallback(() => {
		if (!isPreloading) {
			setIsPlaying(prev => !prev);
		}
	}, [isPreloading]);

	const stopRotation = useCallback(() => {
		setIsPlaying(false);
	}, []);

	const startRotation = useCallback(() => {
		if (!isPreloading) {
			setIsPlaying(true);
		}
	}, [isPreloading]);

	const reverseRotation = useCallback(() => {
		if (!isPreloading) {
			setDirection(prev => prev === 1 ? -1 : 1);
		}
	}, [isPreloading]);

	const resetRotation = useCallback(() => {
		setRotation(0);
		setIsPlaying(false);
	}, []);

	// Обработчики мыши
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		if (isPreloading) return;

		setIsDragging(true);
		setIsPlaying(false);
		startXRef.current = e.clientX;
		startRotationRef.current = rotation;
		e.preventDefault();
	}, [rotation, isPreloading]);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isDragging || isPreloading) return;

		const deltaX = e.clientX - startXRef.current;
		const rotationSensitivity = (360 / (width * 0.8)) * sensitivity;

		let newRotation = startRotationRef.current + deltaX * rotationSensitivity;
		newRotation = newRotation % 360;
		if (newRotation < 0) newRotation += 360;

		setRotation(newRotation);
	}, [isDragging, width, sensitivity, isPreloading]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Инициализация
	useEffect(() => {
		// Запускаем предзагрузку
		preloadAllImages();

		// Запускаем анимацию
		lastTimeRef.current = 0;
		animationRef.current = requestAnimationFrame(animateRotation);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [animateRotation, preloadAllImages]);

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
			containerRef.current.style.cursor = isPreloading ? 'wait' : (isDragging ? 'grabbing' : 'grab');
		}
	}, [isDragging, isPreloading]);

	// Получаем изображение для отображения (первое, если предзагрузка не завершена)
	const getImageToDisplay = () => {
		if (isPreloading) {
			return images[0]; // Всегда показываем первое изображение во время загрузки
		}
		return currentImage;
	};

	const displayImage = getImageToDisplay();

	return (
		<div className={`flex flex-col items-center ${className}`}>
			<div
				ref={containerRef}
				className="relative select-none"
				style={{ width, height }}
				onMouseDown={handleMouseDown}
			>
				{/* Основное изображение */}
				{displayImage && (
					<Image
						src={displayImage}
						alt={alt}
						width={width}
						height={height}
						className="object-contain transition-opacity duration-300"
						style={{
							opacity: isPreloading ? 0.7 : 1,
							filter: isPreloading ? 'blur(1px)' : 'none'
						}}
						draggable={false}
						priority={true}
					/>
				)}

				{/* Оверлей загрузки */}
				{isPreloading && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm rounded-lg">
						<div className="relative w-32 h.
32 mb-4">
							{/* Спиннер загрузки */}
							<div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
							<div
								className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"
								style={{
									borderTopColor: 'transparent',
									borderRightColor: 'transparent'
								}}
							></div>

							{/* Процент загрузки */}
							<div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {preloadProgress}%
                </span>
							</div>
						</div>

						{/* Текст загрузки */}
						<div className="text-center text-white">
							<p className="text-lg font-semibold mb-2">Загрузка модели...</p>
							<p className="text-sm opacity-90">
								Загружено {loadedImages.size} из {images.length} кадров
							</p>
							<p className="text-xs opacity-75 mt-2">
								Пожалуйста, подождите
							</p>
						</div>
					</div>
				)}

				{/* Индикатор направления */}
				{isPlaying && !isPreloading && (
					<div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
						{direction === 1 ? '▶' : '◀'}
					</div>
				)}

				{/* Индикатор предзагрузки (упрощенный) */}
				{!isPreloading && (
					<div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
						Готово
					</div>
				)}
			</div>

			{/* Панель управления */}
			{showControls && (
				<div className={`flex items-center justify-center gap-2 mt-4 p-3 bg-white bg-opacity-80 rounded-lg shadow-lg ${isPreloading ? 'opacity-50' : ''}`}>
					<button
						onClick={reverseRotation}
						disabled={isPreloading}
						className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Обратное направление"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
						</svg>
					</button>

					<button
						onClick={togglePlay}
						disabled={isPreloading}
						className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title={isPlaying ? 'Остановить' : 'Воспроизвести'}
					>
						{isPlaying ? (
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
						) : (
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
							</svg>
						)}
					</button>

					<button
						onClick={resetRotation}
						disabled={isPreloading}
						className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Сбросить вращение"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
			)}

			{/* Информационная панель */}
			<div className="mt-2 text-center text-sm">
				<div className={`${isPreloading ? 'text-gray-400' : 'text-gray-600'}`}>
					<div>
						Кадр: {isPreloading ? '1' : imageIndex + 1} / {images.length}
						{isPreloading && ' (загрузка...)'}
					</div>
					<div className="text-xs mt-1">
						{isPreloading ? (
							<span className="text-blue-500">
                ⚡ Загрузка: {preloadProgress}% ({loadedImages.size}/{images.length})
              </span>
						) : (
							'Перетащите для ручного вращения'
						)}
					</div>
				</div>
			</div>

			{/* Прогресс-бар загрузки */}
			{isPreloading && (
				<div className="w-full max-w-xs mt-3">
					<div className="w-full bg-gray-200 rounded-full h-2.5">
						<div
							className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
							style={{ width: `${preloadProgress}%` }}
						></div>
					</div>
					<div className="text-xs text-gray-500 mt-1 text-center">
						Предзагрузка изображений...
					</div>
				</div>
			)}
		</div>
	);
}
