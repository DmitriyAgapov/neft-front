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

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { PauseIcon, PlayIcon } from "@/Components/Icons/Icons";
import styles from "@/Components/ImageRotate/ImageRotate.module.css";

interface RotatableObjectProps {
	images: string[];
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
	images,
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
	// const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
	// console.log(loadedImages)
	// console.log(images);
	const containerRef = useRef<HTMLDivElement>(null);
	const startXRef = useRef(0);
	const startRotationRef = useRef(0);
	const lastTimeRef = useRef<number>(0);
	const animationRef = useRef<number>(null);

	const imageIndex = Math.floor((rotation / 360) * images.length) % images.length;
	const currentImage = images[imageIndex];
	const res = useMemo(() => {
		const loadedImages = new Set<string>();
		const _res:any[] = [];
		for(let i = 0; i < images.length; i++) {
			if(!loadedImages.has(images[i])) {
				setIsPreloading(false);
				_res.push(<Image src={images[i]}
					alt={alt}
					width={width}
					height={height}
					className="object-contain transition-opacity duration-300"
					// style={{
					// 	opacity: isPreloading ? 0.7 : 1,
					// 	filter: isPreloading ? 'blur(1px)' : 'none'
					// }}
					onLoad={() => {
						setPreloadProgress(i);
						loadedImages.add(images[i])
					}}
					draggable={false}
					priority={true}/>);
			}
		}
		setIsPreloading(false);
		return ({
			loadedImages: loadedImages,
			nodes: _res
		});
	}, [ images, alt, width, height ])
	// Функция предзагрузки всех изображений
	// const preloadAllImages = useCallback(async () => {
	// 	if (!preloadAll || images.length === 0) {
	// 		setIsPreloading(false);
	// 		return;
	// 	}
	//
	// 	const total = images.length;
	// 	let loaded = 0;
	// 	const newLoadedImages = new Set<string>();
	//
	// 	// Добавляем первое изображение в загруженные сразу
	// 	newLoadedImages.add(images[0]);
	// 	setLoadedImages(new Set(newLoadedImages));
	// 	loaded++;
	// 	setPreloadProgress(Math.floor((loaded / total) * 100));
	//
	// 	// Функция для загрузки одного изображения
	// 	const loadImage = (src: string): Promise<void> => {
	// 		return new Promise((resolve, reject) => {
	// 			const img = new window.Image();
	// 			img.src = src;
	//
	// 			img.onload = () => {
	// 				newLoadedImages.add(src);
	// 				setLoadedImages(new Set(newLoadedImages));
	// 				loaded++;
	// 				setPreloadProgress(Math.floor((loaded / total) * 100));
	// 				resolve();
	// 			};
	//
	// 			img.onerror = () => {
	// 				console.warn(`Не удалось загрузить изображение: ${src}`);
	// 				loaded++;
	// 				setPreloadProgress(Math.floor((loaded / total) * 100));
	// 				resolve(); // Продолжаем даже при ошибке
	// 			};
	// 		});
	// 	};
	//
	// 	// Загружаем изображения пачками по 10 для лучшей производительности
	// 	const batchSize = 10;
	// 	for (let i = 1; i < total; i += batchSize) {
	// 		const batch = images.slice(i, i + batchSize);
	// 		await Promise.allSettled(batch.map(src => loadImage(src)));
	//
	// 		// Небольшая пауза между пачками
	// 		if (i + batchSize < total) {
	// 			await new Promise(resolve => setTimeout(resolve, 50));
	// 		}
	// 	}
	//
	// 	setIsPreloading(false);
	// }, [images, preloadAll]);

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
		// preloadAllImages();

		// Запускаем анимацию
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
			containerRef.current.style.cursor = isPreloading ? 'wait' : (isDragging ? 'grabbing' : 'grab');
		}
	}, [isDragging, isPreloading]);

	// Получаем изображение для отображения (первое, если предзагрузка не завершена)
	const getImageToDisplay = useMemo(() => {
		if (isPreloading) {
			return res.nodes[0]; // Всегда показываем первое изображение во время загрузки
		}
		return res.nodes[imageIndex];
	}, [isPreloading, res, imageIndex]);


	return (
		<div className={styles.root}>
			{showControls && (

				<div className={styles.control}>
					<div className={`flex items-center justify-center gap-2 ${isPreloading ? 'opacity-50' : ''}`}>

						<button
							onClick={togglePlay}
							disabled={isPreloading}

							title={isPlaying ? 'Остановить' : 'Воспроизвести'}
						>
							{isPlaying ? (
								<PauseIcon/>
							) : (
								<PlayIcon/>
							)}
						</button>

					</div>
				</div>

			)}
		<div className={`flex flex-col items-center ${className}`}>
			<div
				ref={containerRef}
				className="relative select-none"
				style={{ width, height }}
				onMouseDown={handleMouseDown}
			>
				{getImageToDisplay}
				{/* Основное изображение */}
				{/*{displayImage && (*/}
				{/*	{res}	*/}
				{/*	// <Image*/}
				{/*	// 	src={displayImage}*/}
				{/*	// 	alt={alt}*/}
				{/*	// 	width={width}*/}
				{/*	// 	height={height}*/}
				{/*	// 	className="object-contain transition-opacity duration-300"*/}
				{/*	// 	style={{*/}
				{/*	// 		opacity: isPreloading ? 0.7 : 1,*/}
				{/*	// 		filter: isPreloading ? 'blur(1px)' : 'none'*/}
				{/*	// 	}}*/}
				{/*	// 	preload={true}*/}
				{/*	// 	draggable={false}*/}
				{/*	// 	priority={true}*/}
				{/*	// />*/}
				{/*)}*/}

				{isPreloading && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-40 backdrop-blur-sm rounded-lg">
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
								Загружено {res.loadedImages.size} из {images.length} кадров
							</p>
							<p className="text-xs opacity-75 mt-2">
								Пожалуйста, подождите
							</p>
						</div>
					</div>
				)}

				{/* Индикатор направления */}
				{/*{isPlaying && !isPreloading && (*/}
				{/*	<div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">*/}
				{/*		{direction === 1 ? '▶' : '◀'}*/}
				{/*	</div>*/}
				{/*)}*/}


			</div>

			{/* Панель управления */}


			{/* Информационная панель */}
			{/*<div className="mt-2 text-center text-sm">*/}
			{/*	<div className={`${isPreloading ? 'text-gray-400' : 'text-gray-600'}`}>*/}
			{/*		<div>*/}
			{/*			Кадр: {isPreloading ? '1' : imageIndex + 1} / {images.length}*/}
			{/*			{isPreloading && ' (загрузка...)'}*/}
			{/*		</div>*/}
			{/*		<div className="text-xs mt-1">*/}
			{/*			{isPreloading ? (*/}
			{/*				<span className="text-blue-500">*/}
            {/*    ⚡ Загрузка: {preloadProgress}% ({loadedImages.size}/{images.length})*/}
            {/*  </span>*/}
			{/*			) : (*/}
			{/*				'Перетащите для ручного вращения'*/}
			{/*			)}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}


		</div>
		</div>
	);
}
