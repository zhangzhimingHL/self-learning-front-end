---
name: sync-memory-dirs
description: 全局 memory 目录和项目根目录 .claude/memory 两份记忆必须同步更新
metadata:
  type: feedback
---

全局目录 `C:\Users\18351\.claude\projects\D--Vue3Code-LearningProject\memory\` 和项目根目录 `D:\Vue3Code\LearningProject\.claude\memory\` 两套 memory 必须保持同步。

- 新增/修改/删除任何 memory 文件时，两边都要操作
- 两边的 `MEMORY.md` 索引也要同步更新
- 不能只写一边

**Why:** 用户希望两边都能读到完整的记忆信息，防止不同会话打开不同目录时遗漏上下文。
