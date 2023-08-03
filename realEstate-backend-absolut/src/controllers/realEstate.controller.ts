import { Request, Response } from "express";
import { realEstateService } from "../services";
import { RealEstate } from "../entities";
import { RealEstateRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstate = await realEstateService.create(req.body);
  
  return res.status(201).json(realEstate);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstateRead = await realEstateService.read();
  
  return res.status(200).json(realEstate);
};

export default {create, read}