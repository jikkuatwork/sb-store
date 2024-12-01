import { Model } from '../types';

const SAMPLE_MODELS: Model[] = [
  {
    id: "flux-lora-fast-training",
    title: "Train Flux LoRA",
    category: "training",
    kind: "training",
    tags: ["flux", "lora", "personalization", "styles"],
    shortDescription: "Train styles, people and other subjects at blazing speeds with advanced LoRA techniques.",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=300&q=80",
    githubUrl: "https://github.com/example/flux-lora",
    modelUrl: "https://models.example.com/flux-lora",
    machineType: "A100",
    highlighted: true,
    creditsRequired: 2
  },
  {
    id: "stable-diffusion-xl",
    title: "Stable Diffusion XL",
    category: "inference",
    kind: "inference",
    tags: ["sdxl", "image-generation", "high-quality"],
    shortDescription: "State-of-the-art image generation with unprecedented quality and control.",
    thumbnailUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=300&q=80",
    githubUrl: "https://github.com/example/sdxl",
    modelUrl: "https://models.example.com/sdxl",
    machineType: "A100",
    highlighted: true,
    creditsRequired: 5
  },
  {
    id: "whisper-large-v3",
    title: "Whisper Large v3",
    category: "inference",
    kind: "inference",
    tags: ["audio", "transcription", "multilingual"],
    shortDescription: "Advanced speech recognition and transcription across 100 languages.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555438391-c19e9cc76bc2?q=80&w=300",
    githubUrl: "https://github.com/example/whisper",
    modelUrl: "https://models.example.com/whisper",
    machineType: "A10G",
    highlighted: false,
    creditsRequired: 1
  },
  {
    id: "llama-fine-tuning",
    title: "LLaMA-2 Fine-tuning",
    category: "fine-tuning",
    kind: "fine-tuning",
    tags: ["llm", "customization", "enterprise"],
    shortDescription: "Fine-tune LLaMA-2 models on your custom data for specialized tasks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1517955935808-4e2d8955d3af?q=80&w=300",
    githubUrl: "https://github.com/example/llama-ft",
    modelUrl: "https://models.example.com/llama-ft",
    machineType: "A100",
    highlighted: true,
    creditsRequired: 8
  },
  {
    id: "clip-embeddings",
    title: "CLIP Embeddings",
    category: "embedding",
    kind: "embedding",
    tags: ["vision", "search", "retrieval"],
    shortDescription: "Generate powerful visual embeddings for similarity search and retrieval.",
    thumbnailUrl: "https://images.unsplash.com/photo-1683009427666-340595e57e43?auto=format&fit=crop&w=300&q=80",
    githubUrl: "https://github.com/example/clip",
    modelUrl: "https://models.example.com/clip",
    machineType: "T4",
    highlighted: false,
    creditsRequired: 1
  }
];

export const generateModels = (count: number): Model[] => {
  // For this demo, we'll just return our sample models
  return SAMPLE_MODELS;
};