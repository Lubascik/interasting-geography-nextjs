const GameData = (aGameData) => {
    return aGameData
}

const PlayerData = (aPlayerData) => {
    return aPlayerData
}

const Error = (errorMessage) => {
    return { err: errorMessage }
}

const Success = (successMessage) => {
    return { succ: successMessage }
}

export default class Response {}

Response.GameData = GameData
Response.PlayerData = PlayerData
Response.Error = Error
Response.Success = Success
