import api from "./api";

export async function GetUsers()
{
    const res = await api.get("/users", {});
    return res.data
}

export async function GetPosts()
{
    const res = await api.get("/posts", {});
    return res.data
}
