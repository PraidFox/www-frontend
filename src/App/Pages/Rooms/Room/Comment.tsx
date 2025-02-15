import {Button, Input} from "antd";
import {ChangeEvent, useState} from "react";
import {useCreateComment, useUpdateComment} from "../../../../tools/hooks/queries/Rooms.queries.ts";
import {CommentDto} from "../../../../tools/Models/room.dto.ts";

export const Comment = ({commentDto, roomId, authorId}: {
    commentDto?: CommentDto,
    roomId: number,
    authorId: number
}) => {
    const [commentValue, setCommentValue] = useState('')
    const [changeComment, setChangeComment] = useState(!commentDto)

    const createComment = useCreateComment()
    const updateComment = useUpdateComment()

    const cancel = () => {
        setChangeComment(false)
        setCommentValue('')
    }

    const addOrUpdateComment = async (commentId?: number) => {
        if (commentId) {
            await updateComment.mutateAsync({
                text: commentValue,
                id: commentId
            })
        } else {
            await createComment.mutateAsync({
                roomId: roomId,
                text: commentValue,
                authorId
            })
        }


    }


    if (commentDto && !changeComment) {
        return (
            <div style={{border: "1px solid black", padding: 10}}>
                Автор: {commentDto.author.login}
                <p>{commentDto?.text}</p>
                {commentDto.author.id === authorId && <Button onClick={() => setChangeComment(true)}>Изменить</Button>}
            </div>
        )
    } else {
        return (
            <>
                <Input.TextArea
                    defaultValue={commentDto?.text}
                    showCount
                    maxLength={200}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentValue(e.target.value)}
                />
                {commentDto && <Button onClick={() => addOrUpdateComment(commentDto.id)}>Изменить</Button>}
                {!commentDto && <Button onClick={() => addOrUpdateComment()}>Добавить</Button>}

                <Button onClick={cancel}>Отменить</Button>
            </>
        )
    }
}