import React, { useEffect, useState } from 'react';
import './App.css';
import liff from '@line/liff';

interface Profile {
	userId: string;
	displayName: string;
	pictureUrl: string;
	statusMessage: string;
}

function App() {
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		// initial LIFF
		liff
			.init({
				liffId: '2005779557-NYRVrEVv',
			})
			.then(() => {
				if (!liff.isLoggedIn()) {
					liff.login();
				}
				return liff.getProfile();
			})
			.then((profile) => {
				setProfile(profile as Profile);
			})
			.catch((err) => 'LIFF init error');
	}, []);

	const shareMessage = () => {
		liff
			.shareTargetPicker([
				{
					type: 'text',
					text: 'this is a message from LIFF App',
				},
			])
			.then(() => console.log('share message successfully'))
			.catch((err) => console.log('Share message error', err));
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>welcome to use LIFF APP</h1>
			</header>
			{profile && (
				<div>
					<img
						width={200}
						height={200}
						src={profile.pictureUrl}
						alt="profile"
					/>
					<p>名稱: {profile.displayName}</p>
				</div>
			)}
			<button onClick={shareMessage}>分享訊息</button>
		</div>
	);
}

export default App;
