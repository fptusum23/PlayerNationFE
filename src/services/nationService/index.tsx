import { INation } from "../../models/nation";
import { Player } from "../../models/player";
// import axiosClient from "../axiosClient";

// const ROUTE = 'nation';
export const listNations: INation[] = [
    {
        _id: '1',
        name: 'The Catalyzer 1',
        image: 'https://dummyimage.com/420x260'
    },
    {
        _id: '2',
        name: 'The Catalyzer 2',
        image: 'https://dummyimage.com/420x260'
    },
    {
        _id: '3',
        name: 'The Catalyzer 3',
        image: 'https://dummyimage.com/420x260'
    },
    {
        _id: '4',
        name: 'The Catalyzer 4',
        image: 'https://dummyimage.com/420x260'
    },
    {
        _id: '5',
        name: 'The Catalyzer 5',
        image: 'https://dummyimage.com/420x260'
    }
]
const nationService = {
    async getAll(): Promise<INation[] | any> {
        return listNations ?? []
        // const url = `${ROUTE}`;
        // return await axiosClient.get(url);
    },

    async getById(_id: string): Promise<INation | undefined> {
        return listNations.find(e => e._id == _id)
        // const url = `${ROUTE}/${_id}`;
        // return await axiosClient.get(url);
    },
    async create(nation: INation): Promise<INation | undefined> {
        const newNation = {
            _id: `${listNations.length + 1}`,
            ...nation
        }
        listNations.push(newNation)
        return newNation
    },
    async updateById(_id: string, newNation: INation): Promise<INation | undefined> {
        for (const nation of listNations) {
            if (nation._id == _id) {
                nation.image = newNation.image
                nation.name = newNation.name
                return nation
            }
        }
    },
    async deleteById(_id: string): Promise<boolean> {
        const index = listNations.findIndex(e => e._id == _id);
        if (index >= 0) {
            listNations.splice(index, 1);
            return true
        }
        return false
    }
};

export default nationService;
