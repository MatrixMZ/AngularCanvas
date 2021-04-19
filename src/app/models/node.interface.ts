import { DecisionNode } from './decision-node';

export type NodeRequest = (x: number, y: number, level: number) => Promise<AnyNode>;

export interface Node {
  onMouseClick(event: MouseEvent, nodeRequest: NodeRequest): void;
  update(event: MouseEvent): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export enum NodeType {
  CHANCE = 'Chance node',
  DECISION = 'Decision node',
  END = 'End node'
}

export type AnyNode = DecisionNode;
