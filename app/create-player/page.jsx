"use client"
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CreatePropmt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);

    const [player, setPlayer] = useState({
        playerName: '',
        nickName: '',
        age: '',
        bio: '',
    })

    const createPlayer = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('api/player/create-player', {
                method: "POST",
                body: JSON.stringify({
                    playerName: player.playerName,
                    nickName: player.nickName,
                    age: player.nickName,
                    bio: player.bio,
                    profileImg: imagesURL
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const newImagesUrl = [];
        images.map((image) => newImagesUrl.push(URL.createObjectURL(image)));
        setImagesURL(newImagesUrl)

    }, [images])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleUpload = (e) => {
        setImages([...e.target.files])
    }

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">Create Player</span>
            </h1>
            <p className="desc text-left max-w-md">
                and enjoy lovely moments of lifelong poker friendship
            </p>

            <form
                onSubmit={createPlayer}
                className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
            >
                <input type="file" onChange={handleUpload} />

                {imagesURL.length ? (<Image width={150} height={150} src={imagesURL[0]} alt="image preview" />) : (<p>No image</p>)}


                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Player name*
                    </span>

                    <input
                        value={player.playerName}
                        onChange={(e) => setPlayer({ ...player, playerName: e.target.value })}
                        placeholder="Name..."
                        required
                        className="form_input"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Nickname*
                    </span>

                    <input
                        value={player.nickName}
                        onChange={(e) => setPlayer({ ...player, nickName: e.target.value })}
                        placeholder="something ass kicking like BIZON or BEERZAVR"
                        required
                        className="form_input"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Player age*
                    </span>

                    <input
                        value={player.age}
                        onChange={(e) => setPlayer({ ...player, age: e.target.value })}
                        placeholder="age..."
                        required
                        className="form_input"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Bio*
                    </span>

                    <textarea
                        value={player.bio}
                        onChange={(e) => setPlayer({ ...player, bio: e.target.value })}
                        placeholder="Write your bio here..."
                        required
                        className="form_textarea"
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePropmt