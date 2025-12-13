'use client';

import { Plus } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import GlassButton from '@/components/glass-card/GlassButton';
import ScrollableView from '@/components/layout/ScrollableView';

import { useTasks } from './hooks/useTasks';
import { useTaskDrawer } from './hooks/useTaskDrawer';
import { TaskCard } from './components/TaskCard';
import { EmptyTasksState } from './components/EmptyTasksState';
import { TaskEditDrawer } from './components/TaskEditDrawer';

export default function TasksClient() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskActive,
  } = useTasks();

  const drawer = useTaskDrawer();

  const handleSave = () => {
    drawer.handleSave(createTask, updateTask);
  };

  const handleDelete = () => {
    drawer.handleDelete(deleteTask);
  };

  return (
    <div className='flex flex-col h-full text-white relative overflow-hidden'>
      {/* Task List */}
      <ScrollableView className='px-4 pt-20 pb-32 md:pb-24'>
        {loading && (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent' />
          </div>
        )}

        {error && (
          <GlassCard className='p-4 rounded-xl'>
            <p className='text-red-400'>{error}</p>
          </GlassCard>
        )}

        {!loading && !error && (
          <div className='space-y-3'>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={drawer.openEdit}
                  onToggleActive={toggleTaskActive}
                />
              ))
            ) : (
              <EmptyTasksState onAddTask={drawer.openCreate} />
            )}
          </div>
        )}
      </ScrollableView>

      {/* Floating Add Button */}
      <div className='fixed bottom-20 right-4 z-40'>
        <GlassButton
          onClick={drawer.openCreate}
          size='icon'
          className='w-14 h-14 rounded-full'
        >
          <Plus className='w-6 h-6 text-white' />
        </GlassButton>
      </div>

      {/* Edit Drawer */}
      <TaskEditDrawer
        isOpen={drawer.isOpen}
        editingTask={drawer.editingTask}
        saving={drawer.saving}
        showRecurrenceSelector={drawer.showRecurrenceSelector}
        showLabelInput={drawer.showLabelInput}
        formTime={drawer.formTime}
        formTitle={drawer.formTitle}
        formRecurrence={drawer.formRecurrence}
        formIsAiTask={drawer.formIsAiTask}
        formIsActive={drawer.formIsActive}
        onTimeChange={drawer.setFormTime}
        onTitleChange={drawer.setFormTitle}
        onRecurrenceChange={drawer.setFormRecurrence}
        onIsAiTaskChange={drawer.setFormIsAiTask}
        onIsActiveChange={drawer.setFormIsActive}
        onClose={drawer.close}
        onSave={handleSave}
        onDelete={handleDelete}
        onShowRecurrenceSelector={drawer.setShowRecurrenceSelector}
        onShowLabelInput={drawer.setShowLabelInput}
      />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
