import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
@Injectable()
export class NinjasService {
    private ninjas = [
        {
            id: "1",
            name: "Ninja A",
            weapon: "Stars"
        },
        {
            id: "2",
            name: "Ninja B",
            weapon: "Nunchucks"
        }
    ];

    getNinjas(weapon?: "Stars"|"Nunchucks"){
        if(weapon){
            return this.ninjas.filter((ninja)=>ninja.weapon === weapon)
        }
        return this.ninjas;
    }

    findOne(id:string){
        const ninja = this.ninjas.find((ninja)=> id ===ninja.id);
        if(!ninja){
            throw new Error("ninja not found");
        }
        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto){
        const newNinja = {
            ...createNinjaDto,
            id:uuidv4()
        }
        this.ninjas.push(newNinja);
        return newNinja;
    }

    updateNinja(id:string, updateNinjaDto:UpdateNinjaDto){
        this.ninjas = this.ninjas.map(ninja=>{
            if(ninja.id===id){
                return {...ninja, ...updateNinjaDto}
            }
            return ninja;
        })
        return this.findOne(id);
    }

    removeNinja(id:string){
        const toBeRemoved = this.findOne(id);
        this.ninjas = this.ninjas.filter((ninja)=>ninja.id!==id);
        return toBeRemoved;
    }
}
   
