import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Users as UsersIcon, Shield, User, Mail } from 'lucide-react';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/auth/users');
      setUsers(data.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Could not load team members');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeClass = (role) => {
    const classes = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      agent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      user: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    };
    return classes[role] || classes.user;
  };

  const getRoleIcon = (role) => {
    if (role === 'admin') return <Shield size={16} />;
    if (role === 'agent') return <UsersIcon size={16} />;
    return <User size={16} />;
  };

  const filteredUsers = users.filter((user) => {
    if (filter === 'all') return true;
    return user.role === filter;
  });

  if (currentUser?.role !== 'admin' && currentUser?.role !== 'agent') {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">This area is restricted. Please reach out to a NexaDesk administrator for access.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
      </div>

      <div className="bg-card p-6 rounded-2xl shadow-sm mb-6 border border-border" style={{ boxShadow: '0 1px 3px rgba(8,145,178,0.08)' }}>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Everyone ({users.length})
          </button>
          <button
            onClick={() => setFilter('admin')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'admin'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Administrators ({users.filter((u) => u.role === 'admin').length})
          </button>
          <button
            onClick={() => setFilter('agent')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'agent'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Support Agents ({users.filter((u) => u.role === 'agent').length})
          </button>
          <button
            onClick={() => setFilter('user')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            End Users ({users.filter((u) => u.role === 'user').length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px] text-lg text-muted-foreground">
          Fetching team members...
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border" style={{ boxShadow: '0 1px 3px rgba(13,148,136,0.08)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b-2 border-border">
                  <th className="px-4 py-4 text-left font-semibold text-foreground">Member</th>
                  <th className="px-4 py-4 text-left font-semibold text-foreground">Email Address</th>
                  <th className="px-4 py-4 text-left font-semibold text-foreground">Access Level</th>
                  <th className="px-4 py-4 text-left font-semibold text-foreground">Sign-in Method</th>
                  <th className="px-4 py-4 text-left font-semibold text-foreground">Member Since</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center text-muted-foreground">
                      No team members match this filter
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-border hover:bg-accent duration-200 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail size={16} />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-muted-foreground capitalize">
                          {user.authProvider || 'local'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 bg-card p-6 rounded-2xl shadow-sm border border-border" style={{ boxShadow: '0 1px 3px rgba(8,145,178,0.08)' }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Team Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Members</p>
            <p className="text-2xl font-bold text-foreground">{users.length}</p>
          </div>
          <div className="p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Verified Accounts</p>
            <p className="text-2xl font-bold text-foreground">
              {users.filter((u) => u.isEmailVerified).length}
            </p>
          </div>
          <div className="p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Google SSO Users</p>
            <p className="text-2xl font-bold text-foreground">
              {users.filter((u) => u.authProvider === 'google').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
