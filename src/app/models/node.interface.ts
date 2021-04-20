import { DecisionNode } from './decision-node';
import { Vector } from './vector';

export type NodeRequest = (position: Vector, level: number) => Promise<AnyNode>;

export interface Node {
  handleMouseClick(mousePosition: Vector): void;
  update(mousePosition: Vector): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export enum NodeType {
  CHANCE = 'Chance node',
  DECISION = 'Decision node',
  END = 'End node'
}

export type AnyNode = DecisionNode;
