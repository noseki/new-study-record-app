import React from 'react';
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import { StudyRecord } from "../StudyRecord";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("学習記録アプリ", () => {
    test("タイトルが「学習記録一覧」であること", async () => {
        render(<StudyRecord />);
        expect(await screen.findByRole("heading", { name: "学習記録一覧" })).toBeInTheDocument();
    });

    test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている", async () => {
        render(<StudyRecord />);

        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByRole('listitem')).length;

        const inputTitle = await screen.findByLabelText("学習内容");
        const inputTime = await screen.findByLabelText("学習時間");
        const addButton = await screen.findByRole("button", { name: "登録" });

        // テスト用の記録を入力して登録
        fireEvent.change(inputTitle, { target: { value: "入力テスト" } });
        fireEvent.change(inputTime, { target: { value: "2" } });
        fireEvent.click(addButton);

        // 記録が1つ増えていることを確認
        await waitFor(async () => {
            const newRecords = (await screen.findAllByRole('listitem')).length;
            expect(newRecords).toBe(initialRecords + 1);
        }, { timeout: 2000 });
    });

    test("削除ボタンを押すと学習記録が削除される", async () => {
        render(<StudyRecord />);

        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByRole('listitem')).length;

        // 削除ボタンをクリックして記録を削除
        const deleteButton = screen.getAllByRole('button', { name: '削除' })[0];
        fireEvent.click(deleteButton);

        // 記録が1つ減っていることを確認
        await waitFor(async () => {
            const newRecords = (await screen.findAllByRole('listitem')).length;
            expect(newRecords).toBe(initialRecords - 1);
        }, { timeout: 2000 });
    });

    test("入力をしないで登録を押すとエラーが表示される", async () => {
        render(<StudyRecord />);

        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        const initialRecords = (await screen.findAllByRole('listitem')).length;

        // 入力なしで登録ボタンをクリック
        const addButton = await screen.findByRole("button", { name: "登録" });
        fireEvent.click(addButton);

        // エラーメッセージが表示されていることを確認
        expect(await screen.findByText("入力されていない項目があります")).toBeInTheDocument();

        // リスト数が変わっていないことを確認
        const currentRecords = (await screen.findAllByRole('listitem')).length;
        expect(currentRecords).toBe(initialRecords);
    });
});

