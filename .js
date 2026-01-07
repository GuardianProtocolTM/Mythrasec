import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  BookOpen, Clock, Shield, AlertTriangle, Target, Zap,
  ChevronRight, Play, Calendar, User, Activity, Plus, X, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function ThreatStorytelling() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creatingIncident, setCreatingIncident] = useState(false);

  // Custom incident form state
  const [incidentForm, setIncidentForm] = useState({
    title: '',
    description: '',
    severity: 'medium',
    category: 'malware',
    what_happened: '',
    how_detected: '',
    actions_taken: '',
    outcome: ''
  });

  useEffect(() => {
    loadCases(); // Load cases from mock data or existing data source
  }, []);

  const loadCases = async () => {
    try {
      // Replace with your existing logic to fetch cases
      const mockCases = [/* Array of mock case objects */];
      setCases(mockCases);
    } catch (error) {
      console.log('No cases yet:', error);
      setCases([]);
    }
    setLoading(false);
  };

  const generateStory = async (caseData) => {
    setGeneratingStory(true);
    setSelectedCase(caseData);

    try {
      // Mocking story generation
      const storyResponse = {
        title: "Example Story Title",
        hook: "An interesting opening hook.",
        discovery: "The threat was detected via ...",
        threat_action: "The attacker tried to ...",
        hero_response: "Our system responded by ...",
        resolution: "The threat was contained by ...",
        aftermath: "The lessons learned include ...",
        moral: "Always monitor your systems!",
        timeline_events: [] // Populate with mock timeline events
      };

      setStory(storyResponse);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    }

    setGeneratingStory(false);
  };

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    setCreatingIncident(true);

    try {
      const newCase = {
        case_id: `CUSTOM-${Date.now()}`,
        title: incidentForm.title,
        description: `${incidentForm.description}\n\nWhat Happened: ${incidentForm.what_happened}\n\nHow It Was Detected: ${incidentForm.how_detected}\n\nActions Taken: ${incidentForm.actions_taken}\n\nOutcome: ${incidentForm.outcome}`,
        severity: incidentForm.severity,
        category: incidentForm.category,
        status: 'resolved',
        detection_time: new Date().toISOString(),
        automated_actions_taken: incidentForm.actions_taken.split('\n').filter(a => a.trim()).map(action => ({
          action: action.trim(),
          timestamp: new Date().toISOString(),
          result: 'Success'
        }))
      };

      // Replace with your existing logic to create an incident
      alert('✅ Incident created! You can now tell its story.');

      // Reset form and close
      setIncidentForm({
        title: '',
        description: '',
        severity: 'medium',
        category: 'malware',
        what_happened: '',
        how_detected: '',
        actions_taken: '',
        outcome: ''
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating incident:', error);
      alert('Failed to create incident. Please try again.');
    }

    setCreatingIncident(false);
  };

  const severityColors = {
    critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    high: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' }
  };

  const timelineIcons = {
    detection: { icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    attack: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
    defense: { icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    resolution: { icon: Zap, color: 'text-green-400', bg: 'bg-green-500/10' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-cyan-400" />
              Threat Storytelling
            </h1>
            <p className="text-slate-400">Turn security incidents into engaging narratives</p>
          </div>
          
          {!story && (
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Incident
            </Button>
          )}
        </div>

        {!story ? (
          <>
            {/* Create Incident Form */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                          <Plus className="w-5 h-5 text-purple-400" />
                          Create Your Own Incident
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowCreateForm(false)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateIncident} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-300">Incident Title*</Label>
                            <Input
                              id="title"
                              value={incidentForm.title}
                              onChange={(e) => setIncidentForm({...incidentForm, title: e.target.value})}
                              placeholder="e.g., The Midnight Ransomware Attack"
                              className="bg-slate-800 border-slate-700 text-white"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-300">Incident Type*</Label>
                            <select
                              id="category"
                              value={incidentForm.category}
                              onChange={(e) => setIncidentForm({...incidentForm, category: e.target.value})}
                              className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2"
                              required
                            >
                              <option value="malware">Malware</option>
                              <option value="ransomware">Ransomware</option>
                              <option value="data_breach">Data Breach</option>
                              <option value="insider_threat">Insider Threat</option>
                              <option value="phishing">Phishing</option>
                              <option value="network_intrusion">Network Intrusion</option>
                              <option value="ddos">DDoS Attack</option>
                              <option value="privilege_escalation">Privilege Escalation</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="severity" className="text-slate-300">Severity Level*</Label>
                            <select
                              id="severity"
                              value={incidentForm.severity}
                              onChange={(e) => setIncidentForm({...incidentForm, severity: e.target.value})}
                              className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2"
                              required
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="critical">Critical</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-300">Brief Description*</Label>
                            <Input
                              id="description"
                              value={incidentForm.description}
                              onChange={(e) => setIncidentForm({...incidentForm, description: e.target.value})}
                              placeholder="Quick summary of the incident"
                              className="bg-slate-800 border-slate-700 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="what_happened" className="text-slate-300">What Happened?*</Label>
                          <Textarea
                            id="what_happened"
                            value={incidentForm.what_happened}
                            onChange={(e) => setIncidentForm({...incidentForm, what_happened: e.target.value})}
                            placeholder="Describe the security incident in detail..."
                            className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="how_detected" className="text-slate-300">How Was It Detected?*</Label>
                          <Textarea
                            id="how_detected"
                            value={incidentForm.how_detected}
                            onChange={(e) => setIncidentForm({...incidentForm, how_detected: e.target.value})}
                            placeholder="How did you discover this incident?"
                            className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="actions_taken" className="text-slate-300">Actions Taken*</Label>
                          <Textarea
                            id="actions_taken"
                            value={incidentForm.actions_taken}
                            onChange={(e) => setIncidentForm({...incidentForm, actions_taken: e.target.value})}
                            placeholder="What steps were taken to respond? (One per line)"
                            className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                            required
                          />
                          <p className="text-xs text-slate-500">Enter each action on a new line</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="outcome" className="text-slate-300">Outcome & Lessons Learned*</Label>
                          <Textarea
                            id="outcome"
                            value={incidentForm.outcome}
                            onChange={(e) => setIncidentForm({...incidentForm, outcome: e.target.value})}
                            placeholder="How was it resolved? What did you learn?"
                            className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
                            required
                          />
                        </div>

                        <div className="flex gap-3 justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowCreateForm(false)}
                            className="border-slate-700 text-slate-300"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={creatingIncident}
                            className="bg-gradient-to-r from-purple-500 to-pink-600"
                          >
                            {creatingIncident ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Incident
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Banner */}
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 mb-8">
              <CardContent className="p-6 flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-2">📖 Understanding Through Stories</h3>
                  <p className="text-sm text-slate-300">
                    Complex cybersecurity incidents can be hard to understand. Threat Storytelling transforms 
                    technical reports into engaging narratives with visual timelines, making it easy to understand 
                    what happened, how your systems responded, and what you can learn from each incident.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cases List */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Select an Incident to Tell as a Story</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12 text-slate-400">Loading incidents...</div>
                ) : cases.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No incidents to tell stories about yet</p>
                    <p className="text-sm text-slate-500 mt-2">Create a custom incident to get started</p>
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Incident
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {cases.map((caseItem, i) => {
                      const colors = severityColors[caseItem.severity];
                      return (
                        <motion.div
                          key={caseItem.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card 
                            className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
                            onClick={() => generateStory(caseItem)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge className={`${colors.bg} ${colors.text} border ${colors.border}`}>
                                      {caseItem.severity}
                                    </Badge>
                                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 capitalize">
                                      {caseItem.category}
                                    </Badge>
                                    {caseItem.case_id?.startsWith('CUSTOM-') && (
                                      <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20">
                                        Custom
                                      </Badge>
                                    )}
                                  </div>
                                  <h3 className="text-white font-semibold mb-1">{caseItem.title}</h3>
                                  <p className="text-sm text-slate-400 line-clamp-2">{caseItem.description?.split('\n')[0]}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-600" />
                              </div>

                              <div className="flex items-center gap-4 text-xs text-slate-500 mt-4">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(caseItem.detection_time || caseItem.created_date), 'MMM d, yyyy')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  {caseItem.automated_actions_taken?.length || 0} actions
                                </span>
                              </div>

                              <Button
                                size="sm"
                                className="w-full mt-4 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                              >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Tell This Story
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Story View */}
            {generatingStory ? (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-12 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Crafting Your Story...</h3>
                  <p className="text-slate-400">Our AI is transforming technical details into an engaging narrative</p>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Story Header */}
                <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border-slate-700">
                  <CardContent className="p-8">
                    <Button
                      onClick={() => {
                        setStory(null);
                        setSelectedCase(null);
                      }}
                      variant="outline"
                      size="sm"
                      className="mb-6 border-slate-700 text-slate-400"
                    >
                      ← Back to Incidents
                    </Button>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{story.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <Badge className={`${severityColors[selectedCase.severity].bg} ${severityColors[selectedCase.severity].text} text-sm`}>
                        {selectedCase.severity} severity
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(selectedCase.detection_time || selectedCase.created_date), 'MMMM d, yyyy')}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-sm">
                        Case {selectedCase.case_id}
                      </Badge>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6 mb-6">
                        <p className="text-lg text-slate-200 leading-relaxed italic">
                          {story.hook}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Visual Timeline */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-400" />
                      Incident Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700" />

                      {story.timeline_events?.map((event, i) => {
                        const iconInfo = timelineIcons[event.icon_type] || timelineIcons.detection;
                        const Icon = iconInfo.icon;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative pl-20 pb-8 last:pb-0"
                          >
                            <div className={`absolute left-0 w-16 h-16 ${iconInfo.bg} rounded-full flex items-center justify-center border-4 border-slate-900`}>
                              <Icon className={`w-8 h-8 ${iconInfo.color}`} />
                            </div>
                            
                            <Card className="bg-slate-800/50 border-slate-700">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="text-white font-semibold">{event.title}</h4>
                                  <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                                    {event.time}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-300">{event.description}</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Story Chapters */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">🔍 The Discovery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{story.discovery}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">⚔️ The Threat's Move</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{story.threat_action}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">🛡️ The Guardian's Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{story.hero_response}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">✅ The Resolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{story.resolution}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Aftermath & Moral */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">📚 Lessons Learned</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-purple-400 font-semibold mb-2">What Happened Next:</h4>
                        <p className="text-slate-300 leading-relaxed">{story.aftermath}</p>
                      </div>

                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                        <h4 className="text-purple-400 font-semibold mb-2">💡 The Takeaway:</h4>
                        <p className="text-white leading-relaxed italic">{story.moral}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => {
                      const storyText = `
${story.title}

${story.hook}

THE DISCOVERY
${story.discovery}

THE THREAT'S MOVE
${story.threat_action}

THE GUARDIAN'S RESPONSE
${story.hero_response}

THE RESOLUTION
${story.resolution}

AFTERMATH
${story.aftermath}

TAKEAWAY
${story.moral}
`;
                      navigator.clipboard.writeText(storyText);
                      alert('Story copied to clipboard!');
                    }}
                    className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                  >
                    📋 Copy Story
                  </Button>

                  <Button
                    onClick={() => {
                      setStory(null);
                      setSelectedCase(null);
                    }}
                    className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tell Another Story
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
```
