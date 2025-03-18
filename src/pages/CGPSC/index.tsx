import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SubjectList } from './SubjectList';
import { TopicList } from './TopicList';
import { TestList } from './CgPscTestList';
import { MCQTest } from './CgPscMCQTest';

export function MCQ() {
  return (
    <Routes>
      <Route path="/" element={<SubjectList />} />
      <Route path="/:subject" element={<TopicList />} />
      <Route path="/:subject/:topic" element={<TestList />} />
      <Route path="/:subject/:topic/:testId" element={<MCQTest />} />
    </Routes>
  );
}