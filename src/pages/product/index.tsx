/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Header from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiUpload } from 'react-icons/fi';
import { api } from '../../services/apiClient';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

type ItemProps = {
	id: string;
	name: string;
};

interface CategoryProps {
	categoryList: ItemProps[];
}

const Product = ({ categoryList }: CategoryProps) => {
	const [imgAvatar, setImgAvatar] = useState(null);
	const [avatar, setAvatar] = useState('');
	const [categories, setCategories] = useState(categoryList || []);
	const [categorySelected, setCategorySelected] = useState(0);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	function handleFile(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) return;

		const img = event.target.files[0];

		if (!img) return;

		if (img.type === 'image/jpeg' || img.type === 'image/png') {
			setImgAvatar(img);
			setAvatar(URL.createObjectURL(event.target.files[0]));
		}
	}

	function handleChangeCategory(event) {
		setCategorySelected(event.target.value);
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		try {
			const data = new FormData();

			if (name === '' || price === '' || description === '' || imgAvatar === null) {
				toast.warning('Preencha todos os campos!');
				return;
			}

			data.append('name', name);
			data.append('price', price);
			data.append('description', description);
			data.append('category_id', categories[categorySelected].id);
			data.append('file', imgAvatar);

			const apiClient = setupAPIClient();
			await apiClient.post('/product', data);

			toast.success('Cadastrado com sucesso!');
		} catch (err) {
			console.log(err.message);
			toast.error('Ops, não foi possivel cadastrar');
		} finally {
			setName('');
			setPrice('');
			setDescription('');
			setAvatar('');
			setImgAvatar(null);
		}
	}

	return (
		<>
			<Head>
				<title>Novo Produto - Pizzaria</title>
			</Head>
			<div>
				<Header />
				<main className={styles.container}>
					<h1>Novo Produto</h1>
					<form
						className={styles.form}
						onSubmit={handleSubmit}>
						<label className={styles.labelAvatar}>
							<span>
								<FiUpload
									size={30}
									color="#fff"
								/>
							</span>
							<input
								type="file"
								accept="image/png, image/jpeg"
								onChange={handleFile}
							/>
							{avatar && (
								<img
									className={styles.preview}
									src={avatar}
									alt="Foto do Produto"
									width={250}
									height={250}
								/>
							)}
						</label>
						<select
							onChange={handleChangeCategory}
							value={categorySelected}>
							{categories.map((item, index) => {
								return (
									<option
										key={item.id}
										value={index}>
										{item.name}
									</option>
								);
							})}
						</select>
						<input
							className={styles.input}
							type="text"
							placeholder="Digite o nome do produto"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							className={styles.input}
							type="text"
							placeholder="Digite o preço do produto"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<textarea
							className={styles.input}
							placeholder="Descreva seu produto..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
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

export default Product;

export const getServerSideProps = canSSRAuth(async (ctx) => {
	const apiClient = setupAPIClient(ctx);
	const response = await apiClient.get('/category');

	return {
		props: {
			categoryList: response.data,
		},
	};
});
