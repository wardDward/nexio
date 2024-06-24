<?php
namespace App\Enums;

enum NotificationType: string {
    case LikeNotif = 'like';
    case PostNotif = 'post';
    case CommentNotif = 'comment';
}