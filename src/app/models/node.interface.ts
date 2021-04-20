import { ChanceNode } from './chance.node';
import { DecisionNode } from './decision.node';
import { EndNode } from './end.node';
import { Vector } from './vector';

export type NodeRequest = (position: Vector, level: number) => Promise<AnyNode>;

export interface Node {
  position: Vector;

  handleMouseClick(mousePosition: Vector): void;
  update(mousePosition: Vector): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export enum NodeType {
  CHANCE = 'chance',
  DECISION = 'decision',
  END = 'end'
}

export type AnyNode = DecisionNode | ChanceNode | EndNode;
