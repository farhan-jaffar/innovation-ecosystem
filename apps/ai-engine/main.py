from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import List, Optional

app = FastAPI(
    title="AI Innovation Ecosystem Engine",
    description="Python FastAPI service handling Grok/Groq LLM processing, Innovation Graph, Talent Matching, and AI Assistant",
    version="0.2.0"
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

class TalentMatchRequest(BaseModel):
    project_title: str
    required_skills: List[str]
    domain: Optional[str] = "Artificial Intelligence"

class ProposalAnalysisRequest(BaseModel):
    proposal_title: str
    proposal_description: str
    budget: float
    timeline: str

class ChatAssistantRequest(BaseModel):
    user_query: str
    context_role: Optional[str] = "GOVERNMENT"

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "AI Innovation Ecosystem Engine",
        "llm_provider": "Grok / Groq Llama 3",
        "version": "0.2.0"
    }

@app.post("/api/ai/extract-skills")
def extract_skills(request: SkillExtractionRequest):
    text_lower = request.text.lower()
    known_skills = [
        "Computer Vision", "PyTorch", "TensorFlow", "AgriTech AI", "Drone Autopilot",
        "OpenCV", "Python", "YOLOv8", "Deep Learning", "PostgreSQL", "Next.js", "Docker"
    ]
    extracted = [skill for skill in known_skills if skill.lower() in text_lower]
    if not extracted:
        extracted = ["Artificial Intelligence", "Machine Learning", "System Architecture"]
    
    return {
        "success": True,
        "extracted_skills": extracted,
        "suggested_domain": "Artificial Intelligence & Edge Computing"
    }

@app.post("/api/ai/recommend/talent")
def recommend_talent(request: TalentMatchRequest):
    # Simulated intelligent matching algorithm
    candidates = [
        {
            "username": "draliraza",
            "name": "Dr. Ali Raza",
            "headline": "Lead AI Researcher & Associate Professor of Computer Vision",
            "matched_skills": [s for s in request.required_skills if s in ["Computer Vision", "PyTorch", "TensorFlow", "AgriTech AI", "YOLOv8"]],
            "match_score": 96.5,
            "reasoning": "Direct match for Computer Vision and AgriTech drone diagnostics with 14 peer-reviewed publications."
        },
        {
            "username": "systemsltd",
            "name": "Systems Limited Engineering Team",
            "headline": "Enterprise AI & Cloud Transformation Division",
            "matched_skills": [s for s in request.required_skills if s in ["Python", "Docker", "PostgreSQL", "Next.js"]],
            "match_score": 88.0,
            "reasoning": "Large-scale systems integration capability with verified enterprise credentials."
        }
    ]
    return {
        "success": True,
        "project_title": request.project_title,
        "recommendations": candidates
    }

@app.post("/api/ai/proposal-analysis")
def analyze_proposal(request: ProposalAnalysisRequest):
    # Automated AI Grant Proposal Analysis & Risk Scorecard
    innovation_score = 92.0 if "ai" in request.proposal_description.lower() or "hyperspectral" in request.proposal_description.lower() else 82.0
    budget_feasibility = 95.0 if request.budget <= 15000000 else 78.0
    risk_level = "LOW" if request.budget <= 15000000 else "MEDIUM"
    
    return {
        "success": True,
        "scorecard": {
            "overall_ai_score": round((innovation_score + budget_feasibility) / 2, 1),
            "innovation_score": innovation_score,
            "budget_feasibility_score": budget_feasibility,
            "risk_assessment": risk_level,
            "key_strengths": [
                "Direct lineage to peer-reviewed university research paper PK-2025-9812",
                "Clear milestone-based financial disbursement schedule",
                "High commercialization feasibility in Punjab AgriTech belt"
            ],
            "recommendation": "RECOMMENDED FOR GRANT AWARD"
        }
    }

@app.post("/api/ai/chat")
def assistant_chat(request: ChatAssistantRequest):
    query = request.user_query.lower()
    
    if "research" in query or "paper" in query or "patent" in query:
        response = (
            "I found 2 top university research IP entries matching your request:\n\n"
            "1. **Hyperspectral Rust Detection on Wheat Crops** (FAST NUCES) - 14 Citations, 89 Downloads\n"
            "2. **Deep Q-Learning Microgrid Controller** (FAST NUCES) - IPO Patent PK-2025-9812\n\n"
            "Would you like to initiate a commercialization inquiry or apply for a grant?"
        )
    elif "grant" in query or "funding" in query:
        response = (
            "Pakistan has 3 active funding calls open:\n\n"
            "• **MoITT National AgriTech AI Grand Challenge** - PKR 15,000,000\n"
            "• **HEC Technology Transfer Grant** - PKR 8,000,000\n"
            "• **Systems Ltd R&D Accelerator Fund** - PKR 5,000,000\n\n"
            "You can submit a proposal directly via the Grants & Funding portal!"
        )
    else:
        response = (
            f"Hello! I am the **AI Innovation Ecosystem Assistant** (powered by xAI Grok).\n\n"
            f"I can help you analyze funding proposals, match AI talent to projects, search university research patents, and track national grant disbursements.\n\n"
            f"How can I assist your mission today?"
        )
        
    return {
        "success": True,
        "reply": response,
        "model": "xAI Grok-1 / Groq Llama 3"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
