
import React, { useState } from 'react';
import { FileText, Edit3, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function ProjectNotes() {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(
    "今日のWeb開発学習メモ:\n\n- React HooksのuseEffectについて理解を深めた\n- TypeScriptの型定義で詰まった部分があったが解決\n- 次回はAPI連携の実装に取り組む\n- 疑問点：useMemoとuseCallbackの使い分け"
  );

  const handleSave = () => {
    setIsEditing(false);
    // ここで実際の保存処理を行う
    console.log('Saving notes:', notes);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-kaishu-600" />
            プロジェクトメモ
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[200px] text-sm"
            placeholder="プロジェクトのメモを記録してください..."
          />
        ) : (
          <div className="space-y-2">
            {notes.split('\n').map((line, index) => (
              <p key={index} className="text-sm text-gray-700 leading-relaxed">
                {line || <br />}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
