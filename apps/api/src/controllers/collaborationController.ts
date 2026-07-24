import { Request, Response } from 'express';
import { DataStore } from '../db/store.js';
import { AuthRequest } from '../middleware/auth.js';
import { Workspace, Channel, ChatMessage, WorkspaceTask, VideoMeeting, TaskStatus } from '@innovation/shared-types';

const store = DataStore.getInstance();

export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const list = store.getAllWorkspaces();
    return res.json({
      success: true,
      data: list
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch workspaces.' });
  }
};

export const getWorkspaceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ws = store.getWorkspaceById(id);

    if (!ws) {
      return res.status(404).json({ success: false, error: 'Workspace not found.' });
    }

    return res.json({
      success: true,
      data: ws
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch workspace.' });
  }
};

export const getChannelMessages = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const messages = store.getChannelMessages(channelId);

    return res.json({
      success: true,
      data: messages
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch channel messages.' });
  }
};

export const postChatMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { channelId } = req.params;
    const { content, attachments } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, error: 'Message content is required.' });
    }

    const currentUser = store.findUserById(req.user.id);
    const userProfile = currentUser?.profile as any;
    const senderName = userProfile?.firstName
      ? `${userProfile.firstName} ${userProfile.lastName || ''}`
      : userProfile?.name || req.user.username;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      senderId: req.user.id,
      senderName,
      senderAvatar: userProfile?.logo || '',
      content,
      attachments: Array.isArray(attachments) ? attachments : [],
      createdAt: new Date().toISOString()
    };

    store.createChatMessage(newMsg);

    return res.status(201).json({
      success: true,
      data: newMsg
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to post message.' });
  }
};

export const getWorkspaceTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = store.getWorkspaceTasks(id);

    return res.json({
      success: true,
      data: tasks
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch tasks.' });
  }
};

export const createWorkspaceTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const { title, description, priority, dueDate, assignees, labels } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ success: false, error: 'Task title and due date are required.' });
    }

    const newTask: WorkspaceTask = {
      id: `wtask-${Date.now()}`,
      workspaceId: id,
      title,
      description: description || '',
      assignees: Array.isArray(assignees) ? assignees : [req.user.username],
      createdBy: req.user.username,
      status: TaskStatus.TODO,
      priority: priority || 'MEDIUM',
      dueDate,
      labels: Array.isArray(labels) ? labels : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createWorkspaceTask(newTask);

    return res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to create task.' });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { taskId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Task status is required.' });
    }

    const updated = store.updateWorkspaceTaskStatus(taskId, status as TaskStatus);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Task not found.' });
    }

    return res.json({
      success: true,
      data: updated
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to update task status.' });
  }
};

export const getWorkspaceMeetings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meetings = store.getWorkspaceMeetings(id);

    return res.json({
      success: true,
      data: meetings
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch video meetings.' });
  }
};

export const createVideoMeeting = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const { id } = req.params;
    const { title, scheduledAt, duration, notes } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Meeting title is required.' });
    }

    const roomSlug = title.replace(/[^a-zA-Z0-9]/g, '-');
    const meetingUrl = `https://meet.jit.si/InnovationEcosystem-${roomSlug}-${Date.now()}`;

    const newMeeting: VideoMeeting = {
      id: `meet-${Date.now()}`,
      workspaceId: id,
      title,
      scheduledAt: scheduledAt || new Date().toISOString(),
      duration: duration || '45 mins',
      attendees: [req.user.username],
      meetingUrl,
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    store.createVideoMeeting(newMeeting);

    return res.status(201).json({
      success: true,
      data: newMeeting
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to schedule meeting.' });
  }
};
