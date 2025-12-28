/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Initiative {
  id: string;
  name: string;
  description: string;
  role: string;
  link?: string;
  status?: 'Active' | 'Experimental' | 'Independent' | 'Affiliated';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  longDescription?: string;
  features: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  imageUrl: string;
  outcome: string;
  content: string;
}