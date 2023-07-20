import { connectToDB } from "@utils/database";
import Player from "@models/players";

export const POST = async (req) => {
    const {playerName, nickName, age, bio, profileImg} = await req.json()
    try {
        connectToDB();
        const newPlayer = new Player({
            playerName,
            nickName,
            age,
            bio,
            // profileImg
        });
        await newPlayer.save();

        return new Response(JSON.stringify(newPlayer), {status: 201})
    } catch (error) {
        return new Response("Failed to create new player", {status: 500})
    }
}