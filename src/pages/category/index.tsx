import Head from 'next/head';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { api } from '../../services/apiClient';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

const Category = () => {
	const [name, setName] = useState<string>();

	async function handleRegister(event: FormEvent) {
		event.preventDefault();

		if (name === '') return;

		await api.post('/category', { name });

		toast.success('Categoria cadastrada com sucesso!');

		setName('');
	}

	return (
		<>
			<Head>
				<title>Nova Categoria - Pizzaria</title>
			</Head>
			<div>
				<Header />
				<main className={styles.container}>
					<h1>Cadastrar Categorias</h1>
					<form
						className={styles.form}
						onSubmit={handleRegister}>
						<input
							type="text"
							placeholder="Digite o nome da categoria"
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button
							className={styles.buttonAdd}
							type="submit">
							Cadastrar
						</button>
					</form>
				</main>
			</div>
		</>
	);
};

export default Category;

export const getServerSideProps = canSSRAuth(async (ctx) => {
	return {
		props: {},
	};
});
