import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
}

export const ArrowButton = ({isOpen, onClick}: ArrowButtonProps) => {
	const arrowClass = clsx(styles.arrow, {[styles.arrow_open]: isOpen});
	const containerClass = clsx(styles.container, {[styles.container_open]: isOpen});
	const ariaLabel = isOpen ? 'Закрыть форму параметров статьи' : 'Открыть форму параметров статьи';
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label={ariaLabel}
			tabIndex={0}
			className={containerClass}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClass} />
		</div>
	);
};
