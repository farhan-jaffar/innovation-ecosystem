from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import List, Optional

app = FastAPI(
    title="AI Innovation Ecosystem Engine",
    description="Python FastAPI service handling Grok/Groq LLM processing, Innovation Graph, and Proposal Analysis",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SkillExtractionRequest(BaseModel):
    text: str

class MatchRequest(BaseModel):
    project_skills: List[str]
    candidate_skills: List[str]

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "AI Innovation Ecosystem Engine",
        "llm_provider": "Grok / Groq Llama 3",
        "version": "0.1.0"
    }

@app.post("/api/ai/extract-skills")
def extract_skills(request: SkillExtractionRequest):
    # Stub for Grok skill extraction pipeline
    tokens = [word.strip(",.").capitalize() for word in request.text.split() if len(word) > 5]
    dedup = list(set(tokens))[:8]
    return {
        "success": True,
        "extracted_skills": dedup if dedup else ["Artificial Intelligence", "System Architecture", "Machine Learning"]
    }

@app.post("/api/ai/calculate-match")
def calculate_match(request: MatchRequest):
    if not request.project_skills or not request.candidate_skills:
        return {"match_score": 0.0, "common_skills": []}
    
    set_a = set(s.lower() for s in request.project_skills)
    set_b = set(s.lower() for s in request.candidate_skills)
    common = set_a.intersection(set_b)
    
    score = (len(common) / max(len(set_a), 1)) * 100.0
    return {
        "match_score": round(score, 1),
        "common_skills": list(common)
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
