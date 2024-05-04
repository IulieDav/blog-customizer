import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export type articleProps = {
	onSubmit: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ onSubmit, onReset }: articleProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newState: ArticleStateType = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		onSubmit(newState);
	};

	const handleReset = () => {
		if (onReset) {
			onReset();
		}
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		if (!isMenuOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title={'Шрифт'}
							selected={fontFamily}
							options={fontFamilyOptions}
							onChange={setFontFamily}></Select>
						<RadioGroup
							title={'рАЗМЕР шрифта'}
							name={'fontSize'}
							selected={fontSize}
							options={fontSizeOptions}
							onChange={setFontSize}></RadioGroup>
						<Select
							title={'Цвет шрифта'}
							selected={fontColor}
							options={fontColors}
							onChange={setFontColor}></Select>
						<Separator />
						<Select
							title={'Цвет фона'}
							selected={backgroundColor}
							options={backgroundColors}
							onChange={setBackgroundColor}></Select>
						<Select
							title={'Ширина контента'}
							selected={contentWidth}
							options={contentWidthArr}
							onChange={setContentWidth}></Select>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={handleReset} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
