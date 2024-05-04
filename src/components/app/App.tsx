import { useState, CSSProperties } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import styles from '../../styles/index.module.scss';
import { ArticleParamsForm } from "../article-params-form";
import { Article } from "../article";

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const applyStyles = (newState: ArticleStateType) => {
		setArticleState(newState);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={applyStyles}
				onReset={() => setArticleState(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};