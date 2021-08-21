import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = TodoModel & Document;

@Schema()
export class TodoModel {
  @Prop({required:true})
  title: string;

  @Prop()
  description: string;

  @Prop()
  isComplete: boolean;

  @Prop()
  userId: string;

}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);