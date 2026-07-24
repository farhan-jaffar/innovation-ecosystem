import { Router } from 'express';
import {
  getWorkspaces,
  getWorkspaceById,
  getChannelMessages,
  postChatMessage,
  getWorkspaceTasks,
  createWorkspaceTask,
  updateTaskStatus,
  getWorkspaceMeetings,
  createVideoMeeting
} from '../controllers/collaborationController.js';
import { authenticateJwt } from '../middleware/auth.js';

const router = Router();

router.get('/workspaces', getWorkspaces);
router.get('/workspaces/:id', getWorkspaceById);
router.get('/workspaces/channels/:channelId/messages', getChannelMessages);
router.post('/workspaces/channels/:channelId/messages', authenticateJwt, postChatMessage);
router.get('/workspaces/:id/tasks', getWorkspaceTasks);
router.post('/workspaces/:id/tasks', authenticateJwt, createWorkspaceTask);
router.put('/workspaces/tasks/:taskId', authenticateJwt, updateTaskStatus);
router.get('/workspaces/:id/meetings', getWorkspaceMeetings);
router.post('/workspaces/:id/meetings', authenticateJwt, createVideoMeeting);

export default router;
