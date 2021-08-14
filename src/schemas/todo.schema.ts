import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = TodoModel & Document;

@Schema()
export class TodoModel {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  isComplete: boolean;
}

export interface ToDo extends TodoDocument{
  id:string,
  title:string,
  description:string,
  isComplete:boolean
}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);