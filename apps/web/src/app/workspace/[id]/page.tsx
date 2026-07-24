'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Workspace, Channel, ChatMessage, WorkspaceTask, VideoMeeting, TaskStatus } from '@innovation/shared-types';
import {
  MessageSquare,
  CheckSquare,
  Video,
  Send,
  PlusCircle,
  Hash,
  Lock,
  ArrowLeft,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const KANBAN_COLS: { key: TaskStatus; label: string; bg: string; border: string; text: string }[] = [
  { key: TaskStatus.TODO, label: 'To Do', bg: 'bg-gray-50/50', border: 'border-gray-200', text: 'text-gray-700' },
  { key: TaskStatus.IN_PROGRESS, label: 'In Progress', bg: 'bg-amber-50/50', border: 'border-amber-200', text: 'text-amber-800' },
  { key: TaskStatus.REVIEW, label: 'Under Review', bg: 'bg-purple-50/50', border: 'border-purple-200', text: 'text-purple-800' },
  { key: TaskStatus.DONE, label: 'Completed', bg: 'bg-green-50/50', border: 'border-green-200', text: 'text-green-800' }
];

export default function IntegratedWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'CHAT' | 'TASKS' | 'MEETINGS'>('CHAT');

  // Chat state
  const [activeChannelId, setActiveChannelId] = useState<string>('chan-001');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  // Tasks state
  const [tasks, setTasks] = useState<WorkspaceTask[]>([]);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');

  // Meetings state
  const [meetings, setMeetings] = useState<VideoMeeting[]>([]);
  const [activeMeetingUrl, setActiveMeetingUrl] = useState<string>('https://meet.jit.si/InnovationEcosystem-AgriTech-Lab-001');

  useEffect(() => {
    fetch(`${API_BASE}/workspaces/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setWorkspace(data.data);
          if (data.data.channels && data.data.channels.length > 0) {
            setActiveChannelId(data.data.channels[0].id);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch Chat Messages when channel changes
  useEffect(() => {
    if (!activeChannelId) return;
    fetch(`${API_BASE}/workspaces/channels/${activeChannelId}/messages`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setMessages(data.data);
        }
      })
      .catch(() => {});
  }, [activeChannelId]);

  // Fetch Tasks & Meetings
  useEffect(() => {
    fetch(`${API_BASE}/workspaces/${id}/tasks`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setTasks(data.data);
        }
      });

    fetch(`${API_BASE}/workspaces/${id}/meetings`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setMeetings(data.data);
          if (data.data.length > 0) {
            setActiveMeetingUrl(data.data[0].meetingUrl);
          }
        }
      });
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newMessageContent.trim()) return;

    setSendingMsg(true);
    try {
      const res = await fetch(`${API_BASE}/workspaces/channels/${activeChannelId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: newMessageContent })
      });

      const data = await res.json();
      setSendingMsg(false);

      if (data.success && data.data) {
        setMessages(prev => [...prev, data.data]);
        setNewMessageContent('');
      }
    } catch (err) {
      setSendingMsg(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/workspaces/${id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          dueDate: taskDueDate || '2026-12-30',
          priority: taskPriority
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setTasks(prev => [data.data, ...prev]);
        setShowNewTaskModal(false);
        setTaskTitle('');
        setTaskDesc('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/workspaces/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading workspace...
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Workspace Not Found</h2>
        <Link href="/workspace" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Workspace Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Workspaces
      </button>

      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{workspace.name}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{workspace.description}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => setActiveTab('CHAT')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'CHAT' ? 'bg-white text-green-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Channel Chat
          </button>
          <button
            onClick={() => setActiveTab('TASKS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'TASKS' ? 'bg-white text-green-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckSquare className="w-4 h-4" /> Tasks Kanban
          </button>
          <button
            onClick={() => setActiveTab('MEETINGS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'MEETINGS' ? 'bg-white text-green-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Video className="w-4 h-4" /> Jitsi Video Room
          </button>
        </div>
      </div>

      {/* TAB 1: CHANNEL CHAT */}
      {activeTab === 'CHAT' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 min-h-[550px]">
          {/* Channel Sidebar */}
          <div className="p-4 border-r border-gray-200 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Workspace Channels</h3>
            <div className="space-y-1">
              {workspace.channels.map(chan => (
                <button
                  key={chan.id}
                  onClick={() => setActiveChannelId(chan.id)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                    activeChannelId === chan.id
                      ? 'bg-green-100 text-green-900 border border-green-300'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Hash className="w-3.5 h-3.5 text-gray-400" /> {chan.name}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Feed */}
          <div className="md:col-span-3 flex flex-col justify-between p-6">
            <div className="space-y-4 overflow-y-auto max-h-[420px] pb-4">
              {messages.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs italic">
                  No messages yet in this channel. Start the conversation below!
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {msg.senderName.charAt(0)}
                    </div>
                    <div className="space-y-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-xs">{msg.senderName}</span>
                        <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            {user ? (
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-gray-100">
                <input
                  type="text"
                  value={newMessageContent}
                  onChange={e => setNewMessageContent(e.target.value)}
                  placeholder="Type your message to channel members..."
                  className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </form>
            ) : (
              <div className="p-3 bg-gray-50 text-center text-xs text-gray-500 rounded-2xl border border-gray-200">
                Please sign in to send messages.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: TASKS KANBAN */}
      {activeTab === 'TASKS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">Project Tasks Kanban</h2>
            {user && (
              <button
                onClick={() => setShowNewTaskModal(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Create Task
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[450px]">
            {KANBAN_COLS.map(col => {
              const colTasks = tasks.filter(t => t.status === col.key);

              return (
                <div key={col.key} className={`p-4 rounded-3xl border ${col.border} ${col.bg} space-y-3`}>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                    <h3 className={`text-xs font-bold ${col.text} uppercase tracking-wider`}>{col.label}</h3>
                    <span className="w-5 h-5 rounded-full bg-white text-gray-700 font-extrabold text-[10px] flex items-center justify-center shadow-2xs">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colTasks.map(t => (
                      <div key={t.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                        <h4 className="font-bold text-gray-900 text-xs">{t.title}</h4>
                        <p className="text-[11px] text-gray-600 line-clamp-2">{t.description}</p>
                        <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[10px]">
                          <span className="font-bold text-purple-700">Priority: {t.priority}</span>
                          <select
                            value={t.status}
                            onChange={e => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 font-semibold text-gray-700 focus:outline-none"
                          >
                            <option value={TaskStatus.TODO}>To Do</option>
                            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                            <option value={TaskStatus.REVIEW}>Review</option>
                            <option value={TaskStatus.DONE}>Done</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: JITSI VIDEO MEETINGS */}
      {activeTab === 'MEETINGS' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900">Embedded Jitsi Video Conference</h2>
              <p className="text-xs text-gray-500">Zero-cost HD video conferencing iframe with audio, video & screen share.</p>
            </div>
            <a
              href={activeMeetingUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-green-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-green-700 transition"
            >
              Open Meeting in Full Window ↗
            </a>
          </div>

          {/* Embedded Jitsi Meeting Iframe */}
          <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-gray-300 bg-gray-900 shadow-inner">
            <iframe
              src={`${activeMeetingUrl}#config.prejoinPageEnabled=false`}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              className="w-full h-full border-0"
              title="Jitsi Video Meeting Room"
            />
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl border border-gray-200 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-900">Create Workspace Task</h2>
              <button onClick={() => setShowNewTaskModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Task Title *</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="e.g. Test edge Jetson Nano model accuracy"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Task Description</label>
                <textarea
                  rows={3}
                  value={taskDesc}
                  onChange={e => setTaskDesc(e.target.value)}
                  placeholder="Details and acceptance criteria..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={e => setTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={e => setTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
