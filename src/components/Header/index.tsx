/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
	const { signOut } = useContext(AuthContext);

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/dashboard">
					<img
						src="/logo.svg"
						width={190}
						height={60}
						alt="logo image"
					/>
				</Link>
				<nav className={styles.menuNav}>
					<Link href="/category">
						<a>Categoria</a>
					</Link>
					<Link href="/product">
						<a>Cardápio</a>
					</Link>
					<button onClick={signOut}>
						<FiLogOut
							color="#fff"
							size={24}
						/>
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
