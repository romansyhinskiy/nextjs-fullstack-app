import { model, models, Schema } from "mongoose";

const PlayerSchema = new Schema({
    playerName: {
        type: String,
        required: true,
      },
      nickName: {
        type: String,
      },
      age: {
        type: String,
      },
      bio: {
        type: String,
      },
      profileImg: {
        type: Array,
      },
      totalGames: {
        type: Number,
        default: 0,
      },
      rank: {
        type: Number,
        default: 0,
      },
      wins: {
        type: Number,
        default: 0,
      },
})

const Player = models.Player || model('Player', PlayerSchema);

export default Player