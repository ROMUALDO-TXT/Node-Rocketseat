import { Request, Response } from "express";
import { container } from "tsyringe";

import {UploadCarImageUseCase} from "@modules/cars/useCases/uploadCarImage/UploadCarImageUseCase"

interface IFiles{
    filename: string

}

class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadImageUseCase = container.resolve(UploadCarImageUseCase);

        const images_names = images.map((file)=> file.filename);

        await uploadImageUseCase.execute({
            car_id: id,
            images_names,
        });
        return response.json()
    }
}

export { UploadCarImageController };