import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Activity, Camera, ClipboardList, AlertTriangle, CheckCircle2, Leaf, Utensils, Flame } from 'lucide-react';
import tcmSchema from './data/tcm-schema.json';

type Constitution = keyof typeof tcmSchema.constitutions;

export default function App() {
  const [step, setStep] = useState(0);
  const [ccmqResult, setCcmqResult] = useState<Constitution | null>(null);
  const [tongueResult, setTongueResult] = useState<{ color: string; coating: string; correlation: 'High' | 'Low' | 'Conflict' } | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);

  const simulateCCMQ = () => {
    // Simulate taking the 60-item questionnaire
    setTimeout(() => {
      setCcmqResult('Dampness-Heat');
      setStep(1);
    }, 1000);
  };

  const simulateTongueAI = (scenario: 'match' | 'conflict') => {
    setTimeout(() => {
      if (scenario === 'match') {
        setTongueResult({ color: 'Red', coating: 'Thick Yellow', correlation: 'High' });
        setConfidenceScore(92);
      } else {
        setTongueResult({ color: 'Pale', coating: 'Thin White', correlation: 'Conflict' });
        setConfidenceScore(45);
      }
      setStep(2);
    }, 1500);
  };

  const reset = () => {
    setStep(0);
    setCcmqResult(null);
    setTongueResult(null);
    setConfidenceScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-800 flex items-center justify-center gap-2">
            <Leaf className="h-8 w-8" />
            TCM-Health Prototype
          </h1>
          <p className="text-slate-500">AI-Driven Clinical Informatics & Predictive Analytics</p>
        </header>

        {step === 0 && (
          <Card className="border-emerald-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-emerald-600" />
                Step 1: CCMQ Assessment
              </CardTitle>
              <CardDescription>
                Digitized 60-item Constitution in Chinese Medicine Questionnaire.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 p-6 rounded-lg text-center space-y-4">
                <p className="text-sm text-slate-600">
                  The user answers questions regarding their physical and mental state over the past year.
                </p>
                <Button onClick={simulateCCMQ} className="bg-emerald-600 hover:bg-emerald-700">
                  Simulate CCMQ Completion
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle>CCMQ Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Primary Constitution</p>
                    <p className="text-2xl font-bold text-emerald-900">{ccmqResult}</p>
                  </div>
                  <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-200">
                    Score: 85/100
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  Step 2: Tongue Vision AI
                </CardTitle>
                <CardDescription>
                  Upload a photo of your tongue for computer vision analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={() => simulateTongueAI('match')} variant="outline" className="h-24 flex flex-col gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    <CheckCircle2 className="h-6 w-6" />
                    Simulate Matching Tongue (Red/Yellow)
                  </Button>
                  <Button onClick={() => simulateTongueAI('conflict')} variant="outline" className="h-24 flex flex-col gap-2 border-orange-200 hover:bg-orange-50 hover:text-orange-700">
                    <AlertTriangle className="h-6 w-6" />
                    Simulate Conflicting Tongue (Pale/White)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && ccmqResult && tongueResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Diagnostic Fusion</CardTitle>
                  <CardDescription>Cross-referencing CCMQ with Vision AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50 p-3 rounded border">
                      <span className="text-slate-500 block mb-1">CCMQ Base</span>
                      <span className="font-semibold">{ccmqResult}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border">
                      <span className="text-slate-500 block mb-1">Tongue AI</span>
                      <span className="font-semibold">{tongueResult.color} Body, {tongueResult.coating} Coating</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-end">
                      <span className="font-medium">Confidence Score</span>
                      <span className={`text-xl font-bold ${confidenceScore > 80 ? 'text-emerald-600' : 'text-orange-500'}`}>
                        {confidenceScore}%
                      </span>
                    </div>
                    <Progress value={confidenceScore} className={`h-2 ${confidenceScore > 80 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-orange-500'}`} />
                    
                    {confidenceScore < 60 && (
                      <div className="mt-4 bg-orange-50 border border-orange-200 text-orange-800 p-3 rounded-md flex items-start gap-3 text-sm">
                        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-orange-600" />
                        <p>
                          <strong>Consultation Recommended:</strong> The visual analysis contradicts the questionnaire results. 
                          This may indicate a complex or mixed constitution. Please consult a certified TCM practitioner.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm bg-slate-900 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100">NCD Risk Profile</CardTitle>
                  <CardDescription className="text-slate-400">Predictive Analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center">
                      <span className="text-slate-300">Metabolic Syndrome</span>
                      <Badge className={ccmqResult === 'Phlegm-Dampness' || ccmqResult === 'Dampness-Heat' ? 'bg-red-500' : 'bg-emerald-500'}>
                        {ccmqResult === 'Phlegm-Dampness' || ccmqResult === 'Dampness-Heat' ? 'High' : 'Low'}
                      </Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-slate-300">Type 2 Diabetes</span>
                      <Badge className={ccmqResult === 'Yin Deficiency' || ccmqResult === 'Phlegm-Dampness' ? 'bg-orange-500' : 'bg-emerald-500'}>
                        {ccmqResult === 'Yin Deficiency' || ccmqResult === 'Phlegm-Dampness' ? 'Elevated' : 'Low'}
                      </Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-slate-300">Hypertension</span>
                      <Badge className={ccmqResult === 'Yin Deficiency' || ccmqResult === 'Dampness-Heat' ? 'bg-orange-500' : 'bg-emerald-500'}>
                        {ccmqResult === 'Yin Deficiency' || ccmqResult === 'Dampness-Heat' ? 'Elevated' : 'Low'}
                      </Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Recommendation Engine</CardTitle>
                <CardDescription>Personalized plan based on {ccmqResult} (Singapore Context)</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="diet" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="diet" className="flex gap-2"><Utensils className="h-4 w-4" /> Dietary Advice</TabsTrigger>
                    <TabsTrigger value="exercise" className="flex gap-2"><Activity className="h-4 w-4" /> Exercise Regimen</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="diet" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-emerald-800 flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-4 w-4" /> Primary Needs
                        </h4>
                        <ul className="space-y-2">
                          {tcmSchema.constitutions[ccmqResult].primary_dietary_needs.map((item, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
                          <AlertTriangle className="h-4 w-4" /> Avoid
                        </h4>
                        <ul className="space-y-2">
                          {tcmSchema.constitutions[ccmqResult].avoid.map((item, i) => (
                            <li key={i} className="text-sm flex items-center gap-2 text-slate-600">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-400" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-emerald-900 mb-2">Local Singaporean Context (LLM Generated)</h4>
                      <p className="text-sm text-emerald-800">
                        {ccmqResult === 'Dampness-Heat' 
                          ? "Prioritize cooling and damp-resolving foods. Visit your local NTUC FairPrice or wet market for fresh Winter Melon and Pork Ribs to make a clear soup. Homemade Barley Water (without sugar) is excellent. Avoid spicy Laksa, Mala, and deep-fried hawker foods like Char Kway Teow."
                          : "Focus on warming and Qi-tonifying foods. Herbal Chicken Soup or a warm bowl of Yam Paste (Orh Nee) with reduced sugar are great choices. Avoid excessive iced drinks like Kopi Peng or Bubble Tea."}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exercise" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Recommended Activities</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Intensity:</span>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-500" />
                          {tcmSchema.constitutions[ccmqResult].exercise_intensity} / 10
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {tcmSchema.constitutions[ccmqResult].exercise_types.map((item, i) => (
                        <div key={i} className="bg-slate-100 p-3 rounded-md text-center text-sm font-medium text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={reset}>Start New Assessment</Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
