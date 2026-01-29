import { useEffect, useState } from 'react';
import { assignNoteToMembers, getNoteAssignments } from '@cogni/api';

interface UseNoteAssignmentsProps {
  isGroupNote: boolean;
  noteId: number | undefined;
}

export function useNoteAssignments({
  isGroupNote,
  noteId,
}: UseNoteAssignmentsProps) {
  const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
  const [initialAssigneeIds, setInitialAssigneeIds] = useState<number[]>([]);
  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);
  const [savingAssignment, setSavingAssignment] = useState(false);

  // Load existing assignments
  useEffect(() => {
    if (isGroupNote && noteId) {
      getNoteAssignments(noteId)
        .then(({ assignees }) => {
          const assigneeIdsList = assignees
            .map((a: { workspace_member?: { id?: number } }) => {
              return a.workspace_member?.id;
            })
            .filter((id): id is number => typeof id === 'number');

          setAssigneeIds(assigneeIdsList);
          setInitialAssigneeIds(assigneeIdsList);
          setAssignmentsLoaded(true);
        })
        .catch(err => {
          console.error('Failed to load assignments:', err);
          setAssignmentsLoaded(true);
        });
    }
  }, [isGroupNote, noteId]);

  // Auto-save assignments when changed (only if different from initial)
  useEffect(() => {
    if (!isGroupNote || !noteId || savingAssignment || !assignmentsLoaded)
      return;

    // Check if there's an actual change from the initial state
    const hasChanged =
      assigneeIds.length !== initialAssigneeIds.length ||
      assigneeIds.some(id => !initialAssigneeIds.includes(id)) ||
      initialAssigneeIds.some(id => !assigneeIds.includes(id));

    if (!hasChanged) return;

    const saveAssignments = async () => {
      try {
        setSavingAssignment(true);
        await assignNoteToMembers(noteId, [], assigneeIds);
        // Update initial state after successful save
        setInitialAssigneeIds(assigneeIds);
      } catch (err) {
        console.error('Failed to save assignments:', err);
      } finally {
        setSavingAssignment(false);
      }
    };

    const timeout = setTimeout(saveAssignments, 500);
    return () => clearTimeout(timeout);
  }, [
    assigneeIds,
    initialAssigneeIds,
    isGroupNote,
    noteId,
    savingAssignment,
    assignmentsLoaded,
  ]);

  const toggleAssignee = (memberId: number) => {
    if (assigneeIds.includes(memberId)) {
      setAssigneeIds(assigneeIds.filter(id => id !== memberId));
    } else {
      setAssigneeIds([...assigneeIds, memberId]);
    }
  };

  const selectAllAssignees = (memberIds: number[]) => {
    // If all are selected, deselect all. Otherwise, select all.
    const allSelected = memberIds.every(id => assigneeIds.includes(id));
    if (allSelected) {
      setAssigneeIds([]);
    } else {
      setAssigneeIds(memberIds);
    }
  };

  return {
    assigneeIds,
    toggleAssignee,
    selectAllAssignees,
    savingAssignment,
  };
}
