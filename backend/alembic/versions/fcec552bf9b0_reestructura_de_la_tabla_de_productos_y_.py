"""Reestructura de la tabla de productos y agregada la tabla marca

Revision ID: fcec552bf9b0
Revises: dcf1f2ae4c1b
Create Date: 2023-10-16 17:16:20.055943

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fcec552bf9b0'
down_revision: Union[str, None] = 'dcf1f2ae4c1b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
